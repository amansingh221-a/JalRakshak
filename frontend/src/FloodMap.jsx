import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function FloodMap() {
  const places = [
    {
      name: "Darbhanga",
      position: [26.1542, 85.8918],
      risk: "High",
      color: "#ef4444",
    },
    {
      name: "Madhubani",
      position: [26.3472, 86.0710],
      risk: "Medium",
      color: "#f97316",
    },
    {
      name: "Supaul",
      position: [26.1260, 86.6050],
      risk: "High",
      color: "#ef4444",
    },
    {
      name: "Saharsa",
      position: [25.8830, 86.6000],
      risk: "Medium",
      color: "#f97316",
    },
    {
      name: "Samastipur",
      position: [25.8620, 85.7810],
      risk: "Low",
      color: "#22c55e",
    },
  ];

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <MapContainer
        center={[26.10, 86.10]}
        zoom={8}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place, index) => (
          <Circle
            key={`zone-${index}`}
            center={place.position}
            radius={12000}
            pathOptions={{
              color: place.color,
              fillColor: place.color,
              fillOpacity: 0.25,
            }}
          >
            <Popup>
              <b>{place.name}</b>
              <br />
              Demo Flood Risk: {place.risk}
            </Popup>
          </Circle>
        ))}

        {places.map((place, index) => (
          <CircleMarker
            key={`marker-${index}`}
            center={place.position}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: place.color,
              fillOpacity: 1,
            }}
          >
            <Popup>
              <b>{place.name}</b>
              <br />
              Demo Risk: {place.risk}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default FloodMap;