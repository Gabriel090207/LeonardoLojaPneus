import "./AdminHeader.css";
import logo from "../../assets/images/logo.png";

import { FiMenu, FiBell, FiLogOut } from "react-icons/fi";

import { auth } from "../../services/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ toggleMenu }: any) {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // 🔥 pegar usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      console.log("👋 Logout realizado");

      navigate("/"); // volta pro login
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  // 🔥 gerar iniciais
  const getInitials = (email: string) => {
    if (!email) return "U";

    const name = email.split("@")[0];

    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="adminHeader">

      <div className="adminHeader__left">
        <button className="menuBtn" onClick={toggleMenu}>
          <FiMenu />
        </button>

        <img src={logo} alt="Logo" className="adminLogo" />
      </div>

      <div className="adminHeader__right">

        {/* NOTIFICAÇÃO */}
        <div className="iconBtn">
          <FiBell />
          <span className="badge">2</span>
        </div>

        {/* USUÁRIO */}
        <div className="adminUser">
          <span className="email">{userEmail}</span>
          <div className="avatar">
            {getInitials(userEmail)}
          </div>
        </div>

        {/* LOGOUT */}
        <button className="logoutBtn" onClick={handleLogout}>
          <FiLogOut />
        </button>

      </div>

    </header>
  );
}