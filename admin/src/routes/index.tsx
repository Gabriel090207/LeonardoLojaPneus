import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";
import Offers from "../pages/Offers/Offers";
import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers/Customers";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ROTAS PROTEGIDAS */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/produtos"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
  path="/ofertas"
  element={
    <ProtectedRoute>
      <Offers />
    </ProtectedRoute>
  }
/>
      

      <Route
            path="/pedidos"
            element={
                <ProtectedRoute>
                <Orders />
                </ProtectedRoute>
            }
        />



        <Route
            path="/clientes"
            element={
                <ProtectedRoute>
                <Customers />
                </ProtectedRoute>
            }
            />

    </Routes>
  );
}