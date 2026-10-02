import "./App.css";
import { useState, useEffect } from "react";
import FloodMap from "./FloodMap";

function App() {
  const [backendData, setBackendData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [waterLevel, setWaterLevel] = useState(65);
  const [emergency, setEmergency] = useState(false);
  const [temperature, setTemperature] = useState(32);
  const [rainfall, setRainfall] = useState(45);
  const [selectedDistrict, setSelectedDistrict] = useState("Darbhanga");
  const [alertHistory, setAlertHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/water-level")
      .then((response) => response.json())
      .then((data) => setBackendData(data))
      .catch((error) => console.log("Backend Error:", error));
  }, []);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/predict?rainfall=${rainfall}&water_level=${waterLevel}`
    )
      .then((response) => response.json())
      .then((data) => setPrediction(data))
      .catch((error) => console.log("Prediction Error:", error));
  }, [rainfall, waterLevel]);

  const addAlert = () => {
    setEmergency((prevEmergency) => {
      const isActivating = !prevEmergency;

      setAlertHistory((prev) => [
        isActivating
          ? "Emergency Alert Activated"
          : "Emergency Resolved",
        ...prev,
      ]);

      return isActivating;
    });
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🌊 JalRakshak</h2>
        <p>Flood Response AI</p>
        <hr />
        <p>Dashboard</p>
        <p>Flood Monitoring</p>
        <p>AI Prediction</p>
        <p>Emergency Alerts</p>
      </aside>

      {/* Main Dashboard */}
      <main className="main-content">

        <h1>JalRakshak Dashboard</h1>
        <p className="live-clock">
  📅 {currentTime.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })}
  {" | "}
  🕒 {currentTime.toLocaleTimeString("en-IN")}
</p>
        <div className="system-status">
  <span className="status-dot"></span>
  AI Monitoring System Active
</div>
       <p>
  North Bihar Flood Monitoring System
  <span className="selected-district">
    {" "} | 📍 {selectedDistrict}
  </span>
</p>

        {/* KPI Cards */}
        <div className="stats-grid">

          <div className="stat-card">
            <p>🌊 Water Level</p>
            <h2>{waterLevel}%</h2>
            <span>Current Demo Level</span>
          </div>

          <div className="stat-card">
            <p>🤖 Flood Risk</p>
           <h1 className={`risk-value ${
  String(prediction?.predicted_risk || "").toLowerCase().includes("high")
    ? "risk-high"
    : String(prediction?.predicted_risk || "").toLowerCase().includes("medium")
    ? "risk-medium"
    : "risk-low"
}`}>
  Risk: {prediction?.predicted_risk ?? "Loading..."}
</h1>
            <span>ML Prediction</span>
          </div>

          <div className="stat-card">
            <p>🌧️ Rainfall</p>
            <h2>{rainfall} mm</h2>
            <span>Demo Weather Input</span>
          </div>

          <div className="stat-card">
            <p>🟢 System Status</p>
            <h2>Online</h2>
            <span>Dashboard Active</span>
          </div>

        </div>

        {/* Interactive Map */}
        <div className="card">
          <h2>🗺️ North Bihar Interactive Map</h2>
          <div className="district-selector">
  <label>Select District: </label>

  <select
    value={selectedDistrict}
    onChange={(e) => setSelectedDistrict(e.target.value)}
  >
    <option value="Darbhanga">Darbhanga</option>
    <option value="Madhubani">Madhubani</option>
    <option value="Supaul">Supaul</option>
    <option value="Saharsa">Saharsa</option>
  </select>

  <p>Selected District: {selectedDistrict}</p>
</div>
          <p>Darbhanga | Madhubani | Supaul | Saharsa</p>
          <FloodMap />
        </div>

        {/* Water Level */}
        <div className="card">
          <h2>🌊 Water Level Monitoring</h2>
          <h1>{waterLevel}%</h1>
          <div className="water-progress">
  <div
    className="water-progress-fill"
    style={{ width: `${waterLevel}%` }}
  ></div>
</div>

<p>{waterLevel}% Water Level</p>

          <button
            onClick={() =>
              setWaterLevel(Math.min(waterLevel + 10, 100))
            }
          >
            Increase
          </button>

          <button
            onClick={() =>
              setWaterLevel(Math.max(waterLevel - 10, 0))
            }
          >
            Decrease
          </button>

          <p>Backend: {backendData?.risk || "Connecting..."}</p>
        </div>

        {/* Weather */}
        <div className="card">
          <h2>🌧️ Weather Monitoring</h2>
          <p>Temperature: {temperature}°C</p>
          <p>Rainfall: {rainfall} mm</p>
          <div className="rainfall-meter">
  <div
    className="rainfall-fill"
    style={{ width: `${Math.min(rainfall, 100)}%` }}
  ></div>
</div>

<p>Rainfall Intensity: {rainfall > 70 ? "High" : rainfall > 40 ? "Moderate" : "Low"}</p>

          <div className="rainfall-controls">
  <button
    onClick={() => setRainfall(Math.min(rainfall + 10, 100))}
    disabled={rainfall >= 100}
  >
    + Increase Rainfall
  </button>

  <button
    onClick={() => setRainfall(Math.max(rainfall - 10, 0))}
    disabled={rainfall <= 0}
  >
    - Decrease Rainfall
  </button>
</div>
        </div>

        {/* AI Prediction */}
        <div className="card ai-card">
          <h2>🤖 AI Flood Prediction</h2>

          <p>
            Rainfall: {prediction?.rainfall ?? "Loading..."} mm
          </p>

          <p>
            Water Level: {prediction?.water_level ?? "Loading..."}%
          </p>

          <h1>
            Risk: {prediction?.predicted_risk ?? "Loading..."}
          </h1>

          <p>Machine Learning Demo</p>
        </div>

        {/* Emergency Control */}
        <div className={`card emergency-card ${emergency ? "emergency-active" : ""}`}>
          <h2>🚨 Emergency Control</h2>

          <h3>
            {emergency ? "Emergency Active" : "Normal Status"}
          </h3>

          <button onClick={addAlert}>
            {emergency
              ? "Resolve Emergency"
              : "Activate Emergency"}
          </button>
        </div>

        {/* Alert History */}
<div className="card">
  <h2>📋 Alert History</h2>

  {alertHistory.length === 0 ? (
    <p>No alerts recorded yet.</p>
  ) : (
    alertHistory.map((alert, index) => (
      <div className="alert-item" key={index}>
        <span className="alert-dot"></span>

        <div>
          <strong>{alert}</strong>
          <p>Demo System Event</p>
        </div>
      </div>
    ))
  )}
</div>

      </main>
    </div>
  );
}

export default App;