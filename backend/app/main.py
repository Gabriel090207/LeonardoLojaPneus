from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.services.pagbank_service import create_pix_payment

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Backend online"
    }


from fastapi import Body

@app.post("/api/payment/pix")
def create_pix_order(data = Body(...)):
    return create_pix_payment(data)