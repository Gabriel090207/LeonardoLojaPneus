import React from "react";
import ReactDOM from "react-dom/client";
import { initMercadoPago } from "@mercadopago/sdk-react";

import App from "./App.tsx";
import "./styles/global.css";

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);