from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pathlib import Path
model_path = Path(__file__).parent / "ml" / "flood_model.pkl"
model = joblib.load(model_path)
app = FastAPI(title="JalRakshak API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "Welcome to JalRakshak Flood Response AI",
        "status": "Backend Running"
    }

@app.get("/water-level")
def water_level():
    level = 85

    if level >= 80:
        risk = "High"
    elif level >= 50:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "water_level": level,
        "risk": risk
    }
@app.get("/predict")
def predict_flood(rainfall: float, water_level: float):

    prediction = model.predict([[rainfall, water_level]])

    return {
        "rainfall": rainfall,
        "water_level": water_level,
        "predicted_risk": prediction[0]
    }