import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiTag,
  FiShoppingCart,
  FiUsers,
  FiPercent,
} from "react-icons/fi";

import logo from "../../assets/images/logo.png";

export default function AdminSidebar({ menuOpen, closeMenu }: any) {
  return (
    <aside className={`adminSidebar ${menuOpen ? "open" : ""}`}>

      <div className="sidebarLogo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="adminSidebar__nav">

        {/* DASHBOARD */}
        <NavLink to="/dashboard" onClick={closeMenu}
          className={({ isActive }) => `sidebarItem ${isActive ? "active" : ""}`}>
          <div className="iconBox"><FiGrid /></div>
          <span>Dashboard</span>
        </NavLink>

        {/* PRODUTOS */}
        <NavLink
          to="/produtos"
          onClick={closeMenu}
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
        >
          <div className="iconBox">
            <FiTag />
          </div>
          <span>Produtos</span>
        </NavLink>

        {/* 🔥 OFERTAS (NOVO) */}
        <NavLink
          to="/ofertas"
          onClick={closeMenu}
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
        >
          <div className="iconBox">
            <FiPercent />
          </div>
          <span>Ofertas</span>
        </NavLink>

        {/* PEDIDOS */}
        <NavLink
          to="/pedidos"
          onClick={closeMenu}
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
        >
          <div className="iconBox">
            <FiShoppingCart />
          </div>
          <span>Pedidos</span>
        </NavLink>

        {/* CLIENTES */}
        <NavLink
          to="/clientes"
          onClick={closeMenu}
          className={({ isActive }) =>
            `sidebarItem ${isActive ? "active" : ""}`
          }
        >
          <div className="iconBox">
            <FiUsers />
          </div>
          <span>Clientes</span>
        </NavLink>

        

      </nav>

    </aside>
  );
}