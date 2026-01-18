import { useMapStore } from "../store/useMapStore";

export default function ExportButton() {
  const features = useMapStore((state) => state.features);

  const exportGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      features,
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "map-data.geojson";
    a.click();
  };

  return (
    <button style={styles.button} onClick={exportGeoJSON}>
      Export GeoJSON
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "#22c55e",
    color: "#000",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
