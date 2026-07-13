import os
import mercadopago

sdk = mercadopago.SDK(os.getenv("MERCADOPAGO_ACCESS_TOKEN"))


def create_test_preference():
    preference_data = {
        "items": [
            {
                "title": "Produto de Teste",
                "quantity": 1,
                "currency_id": "BRL",
                "unit_price": 10.00
            }
        ]
    }

    response = sdk.preference().create(preference_data)

    return response["response"]