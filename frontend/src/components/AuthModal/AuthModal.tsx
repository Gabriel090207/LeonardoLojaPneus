import "./AuthModal.css";
import { useState, useEffect } from "react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import CustomToast from "../CustomToast/CustomToast";
import toast from "react-hot-toast";

import { auth, db } from "../../services/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthModal({ onClose, onLogin }: any) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [closing, setClosing] = useState(false);


  const [loading, setLoading] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    toast.custom(() => (
      <CustomToast type={type} message={message} />
    ));
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const maskCep = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const maskCpf = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14);
};

  const fetchCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) {
        showToast("error", "CEP não encontrado");
        return;
      }

      setForm((prev: any) => ({
        ...prev,
        address: data.logradouro,
        bairro: data.bairro,
      }));

    } catch {
      showToast("error", "Erro ao buscar CEP");
    }
  };


  const validateCpf = (cpf: string) => {
  const cleanCpf = cpf.replace(/\D/g, "");

  if (cleanCpf.length !== 11) return false;

  // evita CPFs repetidos
  if (/^(\d)\1+$/.test(cleanCpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
    return false;
  }

  return true;
};


const handleForgotPassword = async () => {

  if (!form.email) {
    showToast("error", "Digite seu email");
    return;
  }

  try {

    await sendPasswordResetEmail(auth, form.email);

    showToast(
      "success",
      "Email de recuperação enviado"
    );

  } catch {
    showToast(
      "error",
      "Não foi possível enviar o email"
    );
  }
};

  const handleClose = () => {
  setClosing(true);

  setTimeout(() => {
    onClose();
  }, 250);
};



  const handleSubmit = async () => {
  if (loading) return; // 🔥 evita clique duplo

  try {
    setLoading(true);

    // ========================
    // CADASTRO
    // ========================
    if (mode === "register") {

      if (form.password !== form.confirmPassword) {
        showToast("error", "Senhas não coincidem");
        return;
      }

      if (!validateCpf(form.cpf || "")) {
  showToast("error", "CPF inválido");
  return;
}

      let userCredential;

      try {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
      } catch (err: any) {
        if (err.code === "auth/email-already-in-use") {
          showToast("error", "Email já cadastrado");
          return;
        }
        throw err;
      }

      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
        phone: form.phone,
        cpf: form.cpf,
        address: form.address,
        bairro: form.bairro,
        numero: form.numero,
        cep: form.cep,
        role: "user",
      });

      showToast("success", "Conta criada com sucesso");

      setTimeout(() => {
        onLogin({ uid, ...form });
      }, 600);
    }

    // ========================
    // LOGIN
    // ========================
    else {

      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        throw new Error();
      }

      showToast("success", "Login realizado");

      onLogin({ uid, ...userDoc.data() });
    }

  } catch {
    showToast("error", "Email ou senha inválidos");
  } finally {
    setLoading(false); // 🔥 SEMPRE executa
  }
};

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
<div className={`authOverlay ${mode === "register" ? "top" : "center"} ${closing ? "closing" : ""}`}>
      <div className="authModal">

        <div className="authHeader">
          <h2>{mode === "login" ? "Entrar" : "Cadastro"}</h2>
         <button onClick={handleClose}>
  <FiX />
</button>
        </div>

        <div className="authBody">

          {mode === "login" ? (
            <>
              <input
                placeholder="Email"
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <div className="passwordGroup">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={form.password || ""}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <span
  className="forgotPassword"
  onClick={handleForgotPassword}
>
  Esqueceu sua senha?
</span>
            </>
          ) : (
            <>
              <div className="grid2">
                <input placeholder="Nome" onChange={(e) => handleChange("name", e.target.value)} />
                <input placeholder="Sobrenome" onChange={(e) => handleChange("lastname", e.target.value)} />
              </div>

              <div className="grid2">
                <input
                  placeholder="Email"
                  value={form.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <input
                  placeholder="Telefone"
                  value={form.phone || ""}
                  onChange={(e) =>
                    handleChange("phone", maskPhone(e.target.value))
                  }
                />
              </div>

              <input
  placeholder="CPF"
  value={form.cpf || ""}
  onChange={(e) =>
    handleChange("cpf", maskCpf(e.target.value))
  }
/>

              <input
                placeholder="CEP"
                value={form.cep || ""}
                onChange={(e) => {
                  const value = maskCep(e.target.value);
                  handleChange("cep", value);

                  if (value.length === 9) {
                    fetchCep(value);
                  }
                }}
              />

              <input
                placeholder="Endereço"
                value={form.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
              />

              <div className="grid2">
                <input
                  placeholder="Bairro"
                  value={form.bairro || ""}
                  onChange={(e) => handleChange("bairro", e.target.value)}
                />
                <input
                  placeholder="Número"
                  onChange={(e) => handleChange("numero", e.target.value)}
                />
              </div>

              <div className="grid2">
                <div className="passwordGroup">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={form.password || ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <div className="passwordGroup">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirmar senha"
                    value={form.confirmPassword || ""}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </>
          )}

          <button
  className={`authBtn ${loading ? "loading" : ""}`}
  onClick={handleSubmit}
  disabled={loading}
>
  {loading
    ? "Carregando..."
    : (mode === "login" ? "Entrar" : "Cadastrar")}
</button>

          <span className="authSwitch">
            {mode === "login" ? (
              <>Não tem conta? <b onClick={() => { setMode("register"); setForm({}); }}>Cadastrar-se</b></>
            ) : (
              <>Já tem conta? <b onClick={() => { setMode("login"); setForm({}); }}>Entrar</b></>
            )}
          </span>

        </div>
      </div>
    </div>
  );
}


