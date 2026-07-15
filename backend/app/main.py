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


# ==========================
# MERCADO PAGO WEBHOOK
# ==========================

@app.post("/api/mercadopago/webhook")
async def mercadopago_webhook(request: Request):

    print("\n====================================")
    print("WEBHOOK MERCADO PAGO")
    print("====================================")

    print("\nHEADERS:")
    print(dict(request.headers))

    raw_body = await request.body()

    print("\nRAW BODY:")
    print(raw_body.decode("utf-8"))

    try:
        body = await request.json()

        print("\nJSON:")
        print(body)

        print("\nTYPE:")
        print(body.get("type"))

        print("\nACTION:")
        print(body.get("action"))

        print("\nDATA:")
        print(body.get("data"))

    except Exception as e:
        print("\nNão foi possível interpretar o body como JSON.")
        print(str(e))

    print("\n====================================\n")

    return {
        "success": True
    }