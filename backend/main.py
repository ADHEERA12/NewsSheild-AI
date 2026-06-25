from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

class News(BaseModel):
    text: str

@app.post("/predict")
def predict(news: News):

    transformed = vectorizer.transform([news.text])

    prediction = model.predict(transformed)

    if prediction[0] == 0:
        return {"prediction": "Real News"}

    return {"prediction": "Fake News"}