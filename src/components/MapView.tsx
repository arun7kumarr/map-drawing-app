import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { handleNewShape } from "../utils/polygonUtils";
import MapResizeFix from "./MapResizeFix";

export default function MapView() {
  return (
    <MapContainer
      center={[28.4595, 77.0266]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapResizeFix />

      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            polygon: true,
            rectangle: true,
            circle: true,
            polyline: true,
            marker: false,
          }}
          onCreated={(e) => {
            const layer = e.layer;          // 🔥 important
            const geojson = layer.toGeoJSON();

            handleNewShape(layer, geojson);
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
