import * as turf from "@turf/turf";
import type { Feature } from "geojson";
import L from "leaflet";
import { useMapStore } from "../store/useMapStore";

/**
 * Convert circle → polygon
 */
function circleToPolygon(circle: any): any {
  const center = circle.geometry.coordinates;
  const radius = circle.properties?._radius || 100;

  return turf.circle(center, radius / 1000, {
    steps: 64,
    units: "kilometers",
  });
}

export function handleNewShape(
  layer: L.Layer,
  newFeature: Feature
) {
  const { features, addFeature } = useMapStore.getState();

  // LineStrings allowed
  if (newFeature.geometry.type === "LineString") {
    addFeature(newFeature);
    return;
  }

  let newPolygon: any;

  if (newFeature.geometry.type === "Polygon") {
    newPolygon = newFeature;
  } else if ((newFeature.geometry as any).type === "Circle") {
    newPolygon = circleToPolygon(newFeature);
  } else {
    addFeature(newFeature);
    return;
  }

  for (const old of features) {
    if (old.geometry.type !== "Polygon") continue;

    const oldPolygon: any = old;

    // FULL ENCLOSURE
    if (turf.booleanContains(oldPolygon, newPolygon)) {
      alert("Polygon cannot be drawn inside another polygon.");
      layer.remove();
      return;
    }

    // PARTIAL OVERLAP
    if (turf.booleanIntersects(oldPolygon, newPolygon)) {
      const fc = turf.featureCollection([newPolygon, oldPolygon]);
      const trimmed = turf.difference(fc);

      layer.remove();

      if (!trimmed) {
        alert("Invalid polygon overlap.");
        return;
      }

      addFeature(trimmed as Feature);
      return;
    }
  }

  // valid polygon
  addFeature(newPolygon);
}
