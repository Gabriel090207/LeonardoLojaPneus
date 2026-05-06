import "./Login.css";

import logo from "../../assets/images/logo.png";
import bg from "../../assets/images/login-bg.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { FiEye, FiEyeOff } from "react-icons/fi";


import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Preencha todos os campos");
    return;
  }

  try {
    setLoading(true);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));

    // ❌ qualquer falha → erro genérico
    if (!userDoc.exists()) {
      throw new Error("invalid");
    }

    const userData = userDoc.data();

    if (userData.role !== "admin") {
      throw new Error("invalid");
    }

    // ✅ sucesso
    navigate("/dashboard");

  } catch (err) {
    setError("Email ou senha inválidos");
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="loginContainer"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay" />

      <div className="loginBox">

        <img src={logo} alt="Logo" className="loginLogo" />

        <h2>Bem-vindo</h2>

        {/* ERRO */}
        {error && <p className="errorMsg">{error}</p>}

        {/* EMAIL */}
        <div className="inputGroup">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* SENHA */}
        <div className="inputGroup passwordGroup">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="eyeBtn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>

        {/* BOTÃO */}
        <button
          className={`loginBtn ${loading ? "loading" : ""}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </div>
    </div>
  );
}