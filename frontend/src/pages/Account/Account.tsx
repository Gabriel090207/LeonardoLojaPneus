import "./Account.css";
import { useState, useEffect } from "react";

import { auth, db } from "../../services/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { FiUser, FiShoppingBag, FiMapPin } from "react-icons/fi";


import { updateDoc } from "firebase/firestore";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast/CustomToast";

export default function Account() {
  const [tab, setTab] = useState("profile");
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const [form, setForm] = useState<any>({});
  const [loadingSave, setLoadingSave] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
const [checkingEmail, setCheckingEmail] = useState(false);

  const navigate = useNavigate();


  const maskCep = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

const fetchCep = async (cep: string) => {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) return;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();

    if (data.erro) {
  toast.custom((t) => (
    <CustomToast
      type="error"
      message="CEP não encontrado"
      t={t}
    />
  ));
  return;
}

    setForm((prev: any) => ({
      ...prev,
      address: data.logradouro,
      bairro: data.bairro,
    }));

  } catch {
  toast.custom((t) => (
    <CustomToast
      type="error"
      message="Erro ao buscar CEP"
      t={t}
    />
  ));
}
};
  

  const handleSave = async () => {
  try {
    setLoadingSave(true);

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    // 🔥 Só tenta atualizar email se realmente mudou
    if (form.email && form.email !== user.email) {
 console.log("Tentando enviar verificação para:", form.email);

await verifyBeforeUpdateEmail(user, form.email);

console.log("Email de verificação enviado!");

  setPendingEmail(form.email);
  setLoadingSave(false);

  toast.custom((t) => (
    <CustomToast
      type="success"
      message="Enviamos um link para verificar o novo email"
      t={t}
    />
  ));

  return;
}



    // 🔥 Atualiza Firestore
    await updateDoc(ref, {
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      phone: form.phone,
    });

    setUserData(form);

    toast.custom((t) => (
      <CustomToast
        type="success"
        message="Dados atualizados com sucesso"
        t={t}
      />
    ));

  } catch (err: any) {
    console.log(err);

    // 🔥 ERROS DO FIREBASE
    if (err.code === "auth/requires-recent-login") {
      toast.custom((t) => (
        <CustomToast
          type="error"
          message="Faça login novamente para alterar o email"
          t={t}
        />
      ));

    } else if (err.code === "auth/operation-not-allowed") {
      toast.custom((t) => (
        <CustomToast
          type="error"
          message="Verifique o email antes de alterar"
          t={t}
        />
      ));

    } else if (err.code === "auth/email-already-in-use") {
      toast.custom((t) => (
        <CustomToast
          type="error"
          message="Este email já está em uso"
          t={t}
        />
      ));

    } else if (err.code === "auth/invalid-email") {
      toast.custom((t) => (
        <CustomToast
          type="error"
          message="Email inválido"
          t={t}
        />
      ));

    } else {
      toast.custom((t) => (
        <CustomToast
          type="error"
          message="Erro ao salvar alterações"
          t={t}
        />
      ));
    }

  } finally {
    setLoadingSave(false);
  }
};


const handleSaveAddress = async () => {
  try {
    setLoadingSave(true);

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    await updateDoc(ref, {
      cep: form.cep,
      address: form.address,
      bairro: form.bairro,
      numero: form.numero,
    });

    setUserData((prev: any) => ({
      ...prev,
      cep: form.cep,
      address: form.address,
      bairro: form.bairro,
      numero: form.numero,
    }));

    toast.custom((t) => (
      <CustomToast
        type="success"
        message="Endereço atualizado com sucesso"
        t={t}
      />
    ));

  } catch {
    toast.custom((t) => (
      <CustomToast
        type="error"
        message="Erro ao salvar endereço"
        t={t}
      />
    ));
  } finally {
    setLoadingSave(false);
  }
};

const handleCheckEmailVerified = async () => {
  try {
    setCheckingEmail(true);

    const user = auth.currentUser;
    if (!user) return;

    await user.reload();

    const refreshedUser = auth.currentUser;
    if (!refreshedUser) return;

    if (pendingEmail && refreshedUser.email === pendingEmail) {
      const ref = doc(db, "users", refreshedUser.uid);

      await updateDoc(ref, {
        email: refreshedUser.email,
      });

      setForm((prev: any) => ({
        ...prev,
        email: refreshedUser.email,
      }));

      setUserData((prev: any) => ({
        ...prev,
        email: refreshedUser.email,
      }));

      setPendingEmail("");

      toast.custom((t) => (
        <CustomToast
          type="success"
          message="Email atualizado com sucesso"
          t={t}
        />
      ));
    } else {
      toast.custom((t) => (
        <CustomToast
          type="error"
          message="Email ainda não foi verificado"
          t={t}
        />
      ));
    }
  } finally {
    setCheckingEmail(false);
  }
};

  // 🔥 AUTH + DADOS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      try {
        // USER
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);

       const authUser = user;

if (snap.exists() && authUser) {
  let data = snap.data();

  // 🔥 se email diferente → atualiza banco
  if (data.email !== authUser.email) {
    await updateDoc(docRef, {
      email: authUser.email,
    });

    // 🔥 atualiza o objeto local também
    data = {
      ...data,
      email: authUser.email,
    };
  }

  // 🔥 agora sim seta os estados
  setUserData(data);
  setForm(data);
}
        // 🔥 PEDIDOS (mock por enquanto, depois filtramos por uid)
        const ordersRef = collection(db, "orders");
        const ordersSnap = await getDocs(ordersRef);

        const list: any[] = [];

        ordersSnap.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setOrders(list);

      } catch {
        console.log("erro ao carregar conta");
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return <div className="accountLoading">Carregando...</div>;
  }

  return (
    <div className="account">
      <div className="accountContainer">

        <h2 className="accountTitle">Minha conta</h2>

        <div className="accountGrid">

          {/* MENU */}
          <aside className="accountMenu">

            <button
              className={tab === "profile" ? "active" : ""}
              onClick={() => setTab("profile")}
            >
              <FiUser />
              Dados pessoais
            </button>

            <button
              className={tab === "orders" ? "active" : ""}
              onClick={() => setTab("orders")}
            >
              <FiShoppingBag />
              Meus pedidos
            </button>

            <button
              className={tab === "address" ? "active" : ""}
              onClick={() => setTab("address")}
            >
              <FiMapPin />
              Endereço
            </button>

          </aside>

          {/* CONTEÚDO */}
          <div className="accountContent">

            {/* PERFIL */}
            {tab === "profile" && (
              <div className="accountCard">
                <h3>Dados pessoais</h3>

                <input
  value={form.name || ""}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
                <input
  value={form.lastname || ""}
  onChange={(e) => setForm({ ...form, lastname: e.target.value })}
/>

<input
  value={pendingEmail || form.email || ""}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>

{pendingEmail && (
  <div className="verifyEmailCard">
    <div>
      <strong>Aguardando verificação</strong>
      <span>
        Enviamos um link para {pendingEmail}. Verifique o email para concluir a alteração.
      </span>
    </div>

    <button onClick={handleCheckEmailVerified} disabled={checkingEmail}>
      {checkingEmail ? "Verificando..." : "Já verifiquei"}
    </button>
  </div>
)}

<input
  value={form.phone || ""}
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>

<button
  className={`saveBtn ${loadingSave ? "loading" : ""}`}
  onClick={handleSave}
>
  Salvar alterações
</button>
              </div>



            )}

            {/* PEDIDOS */}
            {tab === "orders" && (
              <div className="accountCard">
                <h3>Meus pedidos</h3>

                <div className="ordersList">

                  {orders.length === 0 && (
                    <p className="emptyMsg">Nenhum pedido encontrado</p>
                  )}

                  {orders.map((order) => (
                    <div className="orderCard" key={order.id}>

                      <div className="orderTop">
                        <span>Pedido #{order.id.slice(0,6)}</span>
                        <strong>{order.status || "Processando"}</strong>
                      </div>

                      <div className="orderBottom">
                        <span>
                          {order.items?.length || 0} itens
                        </span>

                        <strong>
                          R$ {order.total?.toFixed(2) || "0.00"}
                        </strong>
                      </div>

                    </div>
                  ))}

                </div>
              </div>
            )}

            {/* ENDEREÇO */}
           {tab === "address" && (
  <div className="accountCard">
    <h3>Endereço</h3>

    <input
  placeholder="CEP"
  value={form.cep || ""}
  onChange={(e) => {
    const value = maskCep(e.target.value);
    setForm({ ...form, cep: value });

    if (value.length === 9) {
      fetchCep(value);
    }
  }}
/>

    <input
      placeholder="Endereço"
      value={form.address || ""}
      onChange={(e) => setForm({ ...form, address: e.target.value })}
    />

    <input
      placeholder="Bairro"
      value={form.bairro || ""}
      onChange={(e) => setForm({ ...form, bairro: e.target.value })}
    />

   <input
  placeholder="Número"
  value={form.numero || ""}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setForm({ ...form, numero: value });
  }}
/>

   <button
  className={`saveBtn ${loadingSave ? "loading" : ""}`}
  onClick={handleSaveAddress}
>
  Salvar endereço
</button>
  </div>
)}
          </div>

        </div>
      </div>
    </div>
  );
}