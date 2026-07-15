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
@app.api_route("/api/mercadopago/webhook", methods=["GET", "POST"])
async def mercadopago_webhook(request: Request):

    print("\n==============================")
    print("WEBHOOK RECEBIDO")
    print("==============================")

    print("METHOD:", request.method)
    print("URL:", request.url)

    print("\nHEADERS:")
    print(dict(request.headers))

    print("\nQUERY PARAMS:")
    print(dict(request.query_params))

    try:
        body = await request.json()
    except:
        body = await request.body()

    print("\nBODY:")
    print(body)

    return {"success": True}