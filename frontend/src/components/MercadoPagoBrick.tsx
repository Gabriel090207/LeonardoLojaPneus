import { Payment } from "@mercadopago/sdk-react";
import { api } from "../services/api";

type MercadoPagoBrickProps = {
  amount: number;
  items: any[];
  payer: any;
  shippingAddress: any;
};

export default function MercadoPagoBrick({
  amount,
  items,
  payer,
  shippingAddress,
}: MercadoPagoBrickProps) {
  return (
    <Payment
      initialization={{
        amount: amount,
      }}
      customization={{
        paymentMethods: {
          creditCard: "all",
          debitCard: "all",
          bankTransfer: "all",
          ticket: "all",
        },
      }}
      onSubmit={async (param: any) => {
        try {
         console.log("======= BRICK =======");
console.log(param);

console.log(
  "MP_DEVICE_SESSION_ID:",
  (window as any).MP_DEVICE_SESSION_ID
);

console.log("======================");

          const response = await api.post(
  "/api/mercadopago/order",
  {
    ...param,
    amount,
    items,
    payer,
    shippingAddress,
  }
);

          console.log(response.data);

          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }}
      onReady={() => {
  console.log("Brick carregado");

  console.log(
    "MP_DEVICE_SESSION_ID:",
    (window as any).MP_DEVICE_SESSION_ID
  );

  console.log("====================");

  console.log("Payer:", payer);
  console.log("Shipping:", shippingAddress);
  console.log("Items:", items);
}}
      onError={(error) => {
        console.error(error);
      }}
    />
  );
}