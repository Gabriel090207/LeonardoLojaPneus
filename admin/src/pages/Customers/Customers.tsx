import "./Customers.css";
import AdminLayout from "../../layouts/AdminLayout";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Customers() {
  const [search, setSearch] = useState("");

  // 🔥 mock por enquanto
  const customers = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "11999999999",
      createdAt: "10/03/2024",
    },
  ];

  return (
    <AdminLayout>

      <div className="customers">

        {/* HEADER */}
        <div className="customersHeader">

          <h2>Clientes</h2>

          <div className="customersActions">

            {/* BUSCA */}
            <div className="searchWrapper">
              <FiSearch className="searchIcon" />

              <input
                type="text"
                placeholder="Buscar cliente..."
                className="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

          </div>

        </div>

        {/* TABELA */}
        <div className="tableWrapper">
          <table>

            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cadastro</th>
              </tr>
            </thead>

            <tbody>

              {customers.length === 0 ? (
                <tr className="emptyRow">
                  <td colSpan={4}>
                    <div className="emptyWrapper">
                      Nenhum cliente cadastrado
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.createdAt}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

      </div>

    </AdminLayout>
  );
}