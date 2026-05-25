import "./Customers.css";
import AdminLayout from "../../layouts/AdminLayout";

import { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../services/firebase";

export default function Customers() {

  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState<any[]>([]);

  // 🔥 BUSCAR CLIENTES
  useEffect(() => {

    const ref = collection(db, "users");

    const unsubscribe = onSnapshot(ref, (snapshot) => {

      const list: any[] = [];

      snapshot.forEach((doc) => {

        const data: any = doc.data();

        // 🔥 IGNORA ADMINS
        if (data.role !== "user") return;

        list.push({
          id: doc.id,

          name: data.name || "Sem nome",

          email: data.email || "-",

          phone: data.phone || "-",

          createdAt: data.createdAt
            ? new Date(
                data.createdAt.seconds * 1000
              ).toLocaleDateString("pt-BR")
            : "-",
        });

      });

      setCustomers(list);

    });

    return () => unsubscribe();

  }, []);

  // 🔥 FILTRO BUSCA
  const filteredCustomers = customers.filter((c) => {

    const term = search.toLowerCase();

    return (
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term)
    );

  });

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

              {filteredCustomers.length === 0 ? (

                <tr className="emptyRow">

                  <td colSpan={4}>

                    <div className="emptyWrapper">
                      Nenhum cliente encontrado
                    </div>

                  </td>

                </tr>

              ) : (

                filteredCustomers.map((c) => (

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