import "./OrderModal.css";
import { FiX } from "react-icons/fi";
import { useState } from "react";

export default function OrderModal({ order, onClose }: any) {
  const [status, setStatus] = useState(order.status);

  if (!order) return null;

  return (
    <div className="orderOverlay">

      <div className="orderModal">

        {/* HEADER */}
        <div className="orderHeader">
          <h2>Pedido #{order.id}</h2>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* CLIENTE */}
        <div className="orderSection">
          <h3>Cliente</h3>

          <p><strong>Nome:</strong> {order.customer}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Telefone:</strong> {order.phone}</p>
        </div>

        {/* ENDEREÇO */}
        <div className="orderSection">
          <h3>Endereço</h3>
          <p>{order.address}</p>
        </div>

        {/* PRODUTOS */}
        <div className="orderSection">
          <h3>Produtos</h3>

          <div className="orderProducts">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="orderItem">

                <img src={item.image} />

                <div className="info">
                  <p className="name">{item.name}</p>
                  <span>Qtd: {item.quantity}</span>
                </div>

                <div className="price">
                  {item.price}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* STATUS + TOTAL */}
        <div className="orderFooter">

          <div className="statusBox">
            <span>Status:</span>

          <div className="selectWrapper">
  <select
    className="selectInput"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
  >
    <option value="Pendente">Pendente</option>
    <option value="Pago">Pago</option>
    <option value="Enviado">Enviado</option>
    <option value="Entregue">Entregue</option>
    <option value="Cancelado">Cancelado</option>
  </select>
</div>
          </div>

          <h3>{order.total}</h3>

        </div>

      </div>

    </div>
  );
}