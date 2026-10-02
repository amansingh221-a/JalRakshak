import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib
from pathlib import Path

data = {
    "rainfall": [10, 20, 30, 50, 60, 80, 100, 120, 150, 180],
    "water_level": [10, 20, 25, 40, 50, 60, 70, 80, 90, 95],
    "risk": ["Low", "Low", "Low", "Low", "Medium",
             "Medium", "Medium", "High", "High", "High"]
}

df = pd.DataFrame(data)

X = df[["rainfall", "water_level"]]
y = df["risk"]

model = DecisionTreeClassifier(random_state=42)
model.fit(X, y)

model_path = Path(__file__).with_name("flood_model.pkl")
joblib.dump(model, model_path)

print("JalRakshak ML Model Trained Successfully!")
print("Model saved at:", model_path)