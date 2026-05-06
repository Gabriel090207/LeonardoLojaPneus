import { useState } from "react";
import "./Orders.css";
import AdminLayout from "../../layouts/AdminLayout";
import OrderModal from "../../components/OrderModal/OrderModal";


import { FiSearch } from "react-icons/fi";

const orders = [
  {
    id: "001",
    customer: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    address: "Rua A, 123 - São Paulo",
    total: "R$ 1.200",
    status: "Pendente",
    items: [
      {
        name: "Pneu Michelin Aro 16",
        quantity: 2,
        price: "R$ 600",
        image: "/images/produto.png",
      },
    ],
  },
  {
    id: "002",
    customer: "Maria Souza",
    email: "maria@email.com",
    phone: "(11) 98888-8888",
    address: "Av B, 456 - Rio de Janeiro",
    total: "R$ 850",
    status: "Pago",
    items: [
      {
        name: "Pneu Pirelli Aro 17",
        quantity: 1,
        price: "R$ 850",
        image: "/images/produto.png",
      },
    ],
  },
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <AdminLayout>

      <div className="orders">

        {/* HEADER */}
       <div className="ordersHeader">

  <h2>Pedidos</h2>

  <div className="ordersActions">

    {/* 🔍 BUSCA */}
    <div className="searchWrapper">
  <FiSearch className="searchIcon" />

  <input
    type="text"
    placeholder="Buscar pedido..."
    className="searchInput"
  />
</div>

    {/* 🔽 FILTRO STATUS */}
    <div className="selectWrapper">
      <select className="selectInput selectInput--small">
        <option value="">Todos</option>
        <option value="pendente">Pendente</option>
        <option value="pago">Pago</option>
        <option value="enviado">Enviado</option>
        <option value="entregue">Entregue</option>
      </select>
    </div>

  </div>

</div>

        {/* TABELA */}
        <div className="tableWrapper">
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>

                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button" // 🔥 evita submit
                      className="btnEdit"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>

      {/* 🔥 MODAL */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </AdminLayout>
  );
}