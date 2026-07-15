import os
import requests
import uuid

ACCESS_TOKEN = os.getenv("MERCADOPAGO_ACCESS_TOKEN")

URL = "https://api.mercadopago.com/v1/orders"


def create_order(data):

    print("\n========== DADOS RECEBIDOS ==========")
    print(data)
    print("=====================================\n")

    print("\n======= ITEMS RECEBIDOS =======")
    print(data["items"])
    print("===============================\n")

    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "X-Idempotency-Key": str(uuid.uuid4())
    }

    items = []

    for item in data["items"]:
        items.append({
            "title": item["name"],
            "description": item["name"],
            "category_id": "MLB4049",
            "quantity": item["qty"],
            "unit_price": str(item["price"]),
            "picture_url": item["image"],
            "external_code": item["id"]
        })

    body = {
        "type": "online",
        "processing_mode": "automatic",

        "notification_url": "https://primepneus-backend.onrender.com/api/mercadopago/webhook",

        "external_reference": str(uuid.uuid4()),

        "total_amount": str(data["formData"]["transaction_amount"]),

        "items": items,

        "transactions": {
            "payments": [
                {
                    "amount": str(data["formData"]["transaction_amount"]),

                    "payment_method": {
                        "id": data["formData"]["payment_method_id"],
                        "type": data["paymentType"],

                        # TESTAR
                        # Se der erro 400, remova esta linha.
                        # "statement_descriptor": "Leonardo Pneus",
                    },

                    "expiration_time": "P1D",
                }
            ]
        },

        "payer": {
            "first_name": data["payer"]["name"],
            "last_name": data["payer"]["lastname"],
            "email": "test@testuser.com",

            "identification": {
                "type": "CPF",
                "number": data["payer"]["cpf"].replace(".", "").replace("-", "")
            },

            "address": {
                "zip_code": data["shippingAddress"]["cep"].replace("-", ""),
                "street_name": data["shippingAddress"]["address"],
                "street_number": data["shippingAddress"]["numero"],
                "city": data["shippingAddress"]["cidade"],
                "state": data["shippingAddress"]["estado"],
            },
        },

        "shipment": {
            "address": {
                "zip_code": data["shippingAddress"]["cep"].replace("-", ""),
                "street_name": data["shippingAddress"]["address"],
                "street_number": data["shippingAddress"]["numero"],
                "neighborhood": data["shippingAddress"]["bairro"],
                "city": data["shippingAddress"]["cidade"],
                "state": data["shippingAddress"]["estado"],
                "complement": "Sem complemento"
            }
        }
    }

    response = requests.post(
        URL,
        headers=headers,
        json=body
    )

    print(response.status_code)
    print(response.text)

    try:
        return response.json()
    except Exception:
        return {
            "status": response.status_code,
            "text": response.text
        }