import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SERVICE_AREA: [number, number][] = [
  [38.72, -121.82],
  [38.78, -121.68],
  [38.82, -121.52],
  [38.81, -121.35],
  [38.78, -121.20],
  [38.74, -121.08],
  [38.70, -120.95],
  [38.65, -120.88],
  [38.58, -120.85],
  [38.50, -120.88],
  [38.45, -120.95],
  [38.42, -121.08],
  [38.40, -121.22],
  [38.39, -121.38],
  [38.40, -121.52],
  [38.42, -121.62],
  [38.48, -121.74],
  [38.55, -121.82],
  [38.60, -121.86],
  [38.66, -121.87],
  [38.72, -121.82],
];

const CENTER: [number, number] = [38.58, -121.35];

export function ServiceAreaMap() {
  return (
    <MapContainer
      center={CENTER}
      zoom={10}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polygon
        positions={SERVICE_AREA}
        pathOptions={{
          color: "#cc0000",
          weight: 2.5,
          dashArray: "8, 6",
          fillColor: "#006837",
          fillOpacity: 0.08,
        }}
      />
    </MapContainer>
  );
}
