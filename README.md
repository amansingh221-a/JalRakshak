JalRakshak – AI-Based Flood Risk Prediction System

An AI/ML-powered flood monitoring and risk visualization demo

JalRakshak is a student-developed project that demonstrates how Machine Learning and web technologies can be integrated to visualize flood-related parameters and display predicted risk categories.

The project focuses on a North Bihar demonstration map featuring Darbhanga, Madhubani, Supaul, and Saharsa.

👨‍💻 Developer

Aman Kumar
Department of Computer Science and Engineering (AI & ML)
COER University

✨ Features

- 🌊 Water Level Monitoring
- 🌧️ Rainfall Monitoring
- 🤖 ML-Based Flood Risk Classification
- 🗺️ Interactive North Bihar Map
- 📍 District Selection
- 🚨 Emergency Control Demo
- 📋 Alert History
- 🕒 Live Date and Time
- 📊 Interactive Dashboard

🛠️ Technologies Used

Technology| Purpose
React.js| Frontend
CSS| Dashboard UI
Python| Backend and ML
FastAPI| REST API
Pandas| Data handling
Scikit-learn| Machine Learning
Leaflet| Interactive Map

📁 Project Structure

JalRakshak/
│
├── frontend/
│ ├── src/
│ ├── package.json
│ └── ...
│
├── backend/
│ ├── main.py
│ └── ml/
│ └── flood_model.pkl
│
└── README.md

⚙️ Installation and Setup

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

2. Start Backend

cd backend
pip install fastapi uvicorn pandas scikit-learn
python -m uvicorn main:app --reload

Backend URL:

"http://127.0.0.1:8000"

API Documentation:

"http://127.0.0.1:8000/docs"

3. Start Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open the local URL shown in the terminal, usually:

"http://localhost:5173"

🧠 Project Methodology

The frontend collects demonstration rainfall and water-level values and sends them to the FastAPI backend. The backend processes the request using the configured ML model and returns a risk category for display.

⚠️ Disclaimer

This is an educational demonstration project. It uses demo inputs and is not validated for operational flood forecasting or emergency decisions. District selection and emergency controls are demonstration features, not official alert services.

🔮 Future Scope

- Integration of verified real-time weather and river data
- District-specific model development
- Model evaluation using real historical datasets
- Improved visualization and accessibility
- Validated early-warning workflows

📜 License

Created for academic learning and demonstration purposes.

---
LINKEDIN - https://www.linkedin.com/in/aman-kumar-b05056422?utm_source=share_via&utm_content=profile&utm_medium=member_android

Developed by Aman Kumar | COER University
