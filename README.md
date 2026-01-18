# 🗺️ Map Drawing Application

A React + TypeScript web application that renders OpenStreetMap tiles and allows users to draw and manage geometrical features on a map with spatial constraints.

---

## 🚀 Tech Stack

- React.js + TypeScript
- Vite
- Leaflet & React-Leaflet
- Leaflet-Draw
- Turf.js (spatial operations)
- Zustand (state management)

---

## 📌 Features

- OpenStreetMap base layer
- Draw shapes:
  - Polygon
  - Rectangle
  - Circle
  - LineString
- Non-overlapping constraints for polygonal shapes
- Auto-trimming of overlapping polygons
- Block fully enclosed polygons
- LineStrings allowed to overlap freely
- Export all drawn features as GeoJSON

---

## ⚙️ Setup & Run Instructions

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/map-drawing-app.git
cd map-drawing-app





Polygon Overlap Logic Explanation

Polygon validation is implemented using Turf.js.

Rules implemented:

Polygonal shapes include:

Polygon

Rectangle (internally treated as Polygon)

Circle (converted to Polygon for spatial operations)

LineStrings are excluded from overlap constraints.

Logic Flow:

When a new shape is drawn, it is converted to GeoJSON.

LineStrings are immediately accepted without validation.

Polygonal shapes are validated against existing polygons.

If a new polygon is fully enclosed inside another polygon, drawing is blocked.

If partial overlap occurs, the overlapping region is automatically trimmed using turf.difference().

The original invalid layer is removed and only the valid geometry is stored.

The final result ensures no overlapping polygonal areas.

This approach ensures spatial consistency while maintaining a smooth drawing experience.




Sample GeoJSON Export

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "shapeType": "Polygon"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.02, 28.45],
            [77.03, 28.45],
            [77.03, 28.46],
            [77.02, 28.46],
            [77.02, 28.45]
          ]
        ]
      }
    }
  ]
}
