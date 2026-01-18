import * as turf from "@turf/turf";
import type { Feature, Polygon } from "geojson";
import L from "leaflet";
import { useMapStore } from "../store/useMapStore";

/**
 * Convert circle → polygon (Turf compatible)
 */
function circleToPolygon(circle: any): Feature<Polygon> {
  const center = circle.geometry.coordinates;
  const radius = circle.properties?._radius || 100;

  return turf.circle(center, radius / 1000, {
    steps: 64,
    units: "kilometers",
  }) as Feature<Polygon>;
}

export function handleNewShape(
  layer: L.Layer,
  newFeature: Feature
) {
  const { features, addFeature } = useMapStore.getState();

  // ✅ LineStrings are excluded
  if (newFeature.geometry.type === "LineString") {
    addFeature(newFeature);
    return;
  }

  // Normalize to polygon
  let newPolygon: Feature<Polygon>;

  if (newFeature.geometry.type === "Polygon") {
    newPolygon = newFeature as Feature<Polygon>;
  } else if ((newFeature.geometry as any).type === "Circle") {
    newPolygon = circleToPolygon(newFeature);
  } else {
    addFeature(newFeature);
    return;
  }

  for (const old of features) {
    if (old.geometry.type !== "Polygon") continue;

    const oldPolygon = old as Feature<Polygon>;

    // 🚫 FULLY INSIDE → BLOCK
    if (turf.booleanContains(oldPolygon, newPolygon)) {
      alert("Polygon cannot be drawn inside another polygon.");
      layer.remove(); // 🔥 remove from map
      return;
    }

    // 🔁 PARTIAL OVERLAP → AUTO TRIM
    const intersection = turf.intersect(oldPolygon, newPolygon);

    if (intersection) {
      const trimmed = turf.difference(newPolygon, oldPolygon);

      layer.remove(); // 🔥 remove original drawn shape

      if (!trimmed) {
        alert("Invalid polygon overlap.");
        return;
      }

      addFeature(trimmed as Feature);
      return;
    }
  }

  // ✅ Valid polygon
  addFeature(newFeature);
}
