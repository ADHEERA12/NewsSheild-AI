import os
import pickle
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Fake News Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "vectorizer.pkl")

model = pickle.load(open(model_path, "rb"))
vectorizer = pickle.load(open(vectorizer_path, "rb"))

class News(BaseModel):
    text: str

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "Fake News Detection API",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None
    }

@app.post("/predict")
def predict(news: News):
    text = (news.text or "").strip()
    if not text:
        return {"error": "News text cannot be empty", "prediction": "Unknown"}

    transformed = vectorizer.transform([text])
    prediction = model.predict(transformed)[0]

    # Calculate probabilities if available
    real_confidence = 0.0
    fake_confidence = 0.0
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(transformed)[0]
        real_confidence = round(float(probs[0]) * 100, 2)
        fake_confidence = round(float(probs[1]) * 100, 2)
    else:
        real_confidence = 100.0 if prediction == 0 else 0.0
        fake_confidence = 100.0 if prediction == 1 else 0.0

    is_real = bool(prediction == 0)
    result_label = "Real News" if is_real else "Fake News"
    confidence = real_confidence if is_real else fake_confidence

    return {
        "prediction": result_label,
        "is_real": is_real,
        "confidence": confidence,
        "probabilities": {
            "real": real_confidence,
            "fake": fake_confidence
        }
    }
