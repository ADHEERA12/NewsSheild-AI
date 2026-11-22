# Fake News Detection System

Full-stack machine learning web application to detect and analyze fake news articles using NLP (TF-IDF Vectorization & Logistic Regression).

---

## 🚀 How to Run the Application

You will need **two terminal windows** (one for the backend, one for the frontend).

### 1. Start the Backend (FastAPI)

Open your first terminal in the project root:

```bash
cd Fake-News-Detection-/backend
uvicorn main:app --reload
```
- API will start at: `http://127.0.0.1:8000`
- API documentation (Swagger UI): `http://127.0.0.1:8000/docs`

---

### 2. Start the Frontend (React + Vite)

Open a second terminal:

```bash
cd Fake-News-Detection-/frontend
npm run dev
```
- Frontend will run at: `http://localhost:5173`
- Open your browser and navigate to `http://localhost:5173`

---

## ✨ Features

- **Live AI Detection**: Evaluates authenticity of news text using the Scikit-Learn NLP model.
- **Confidence Meter**: Shows real-time probability percentage for both Real and Fake classification.
- **Sensationalism & Heuristic Analysis**: Flags excessive capitalization, emotional triggers, and clickbait patterns.
- **Instant Sample Testing**: Pre-loaded authentic and fake news samples to test immediately.
- **Analysis History**: Saves past predictions locally in your browser with clear timestamps and snippets.
- **Fact-Checking Guide**: Built-in 4-step media literacy guide to help spot misinformation.
- **Dark & Light Mode**: Sleek modern UI with glassmorphism design and toggleable themes.
- **Offline / Demo Mode**: Built-in toggle to test the full UI flow even if the backend is temporarily offline.
