import os
import requests

from dotenv import load_dotenv

load_dotenv()

PAGBANK_TOKEN = os.getenv("PAGBANK_TOKEN")
print("TOKEN PAGBANK:", PAGBANK_TOKEN)

BASE_URL = "https://api.pagseguro.com"

def create_pix_payment():
    url = f"{BASE_URL}/orders"

    headers = {
        "Authorization": f"Bearer {PAGBANK_TOKEN}",
        "Content-Type": "application/json"
    }

    body = {
        "reference_id": "pedido-123",
        "customer": {
            "name": "Cliente Teste",
            "email": "cliente@teste.com",
            "tax_id": "12345678909"
        },
        "items": [
            {
                "reference_id": "produto-1",
                "name": "Pneu Teste",
                "quantity": 1,
                "unit_amount": 10
            }
        ],
        "qr_codes": [
            {
                "amount": {
                    "value": 10
                }
            }
        ]
    }

    response = requests.post(
        url,
        json=body,
        headers=headers
    )

    data = response.json()

    print("PAGBANK RESPONSE:")
    print(data)

    if "qr_codes" not in data:
        return data

    qr_code = data["qr_codes"][0]

    return {
        "order_id": data["id"],
        "qr_code_text": qr_code["text"],
        "qr_code_base64": qr_code["links"][0]["href"],
        "pix_copy_paste": qr_code["text"]
    }