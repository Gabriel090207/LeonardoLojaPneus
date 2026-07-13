from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.services.mercadopago_service import create_test_preference
from app.services.mercadopago_orders import create_order

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


# ==========================
# PAGBANK PIX
# ==========================

@app.post("/api/payment/pix")
def create_pix_order(data=Body(...)):
    return create_pix_payment(data)


# ==========================
# MERCADO PAGO TESTE
# ==========================

@app.get("/api/mercadopago/test")
def mercadopago_test():
    return create_test_preference()


# ==========================
# MERCADO PAGO ORDERS
# ==========================

@app.post("/api/mercadopago/order")
def mercadopago_order(data=Body(...)):
    return create_order(data)

@app.post("/api/mercadopago/webhook")
async def mercadopago_webhook(request: Request):
    body = await request.json()

    print("\n===== WEBHOOK MP =====")
    print(body)
    print("======================\n")

    return {"status": "ok"}