import "./Checkout.css";
import { useEffect, useState } from "react";

import MercadoPagoBrick from "../../components/MercadoPagoBrick";

import { auth, db } from "../../services/firebase";

import {
  doc,
  getDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { api } from "../../services/api";

import CustomToast from "../../components/CustomToast/CustomToast";

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [step, setStep] = useState(1);

const [, setPixData] = useState<any>(null);
  const [pixLoading, setPixLoading] = useState(false);

const [paymentMethod, setPaymentMethod] = useState("pix");


const [cartItems, setCartItems] = useState<any[]>([]);
const [products, setProducts] = useState<any[]>([]);
const [offers, setOffers] = useState<any[]>([]);

 const [savedAddress, setSavedAddress] = useState({
  cep: "",
  address: "",
  bairro: "",
  numero: "",
  cidade: "",
  estado: "",
});

const [form, setForm] = useState({
  cep: "",
  address: "",
  bairro: "",
  numero: "",
  cidade: "",
  estado: "",
});

const [payer, setPayer] = useState({
  name: "",
  lastname: "",
  email: "",
  cpf: "",
  phone: "",
  registrationDate: "",
});

  const total = cartItems.reduce((acc, item) => {
  return acc + item.price * item.qty;
}, 0);

const formatPrice = (value: number) => {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

  const navigate = useNavigate();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  return () => unsubscribe();
}, []);

  // 🔥 TOAST
  const showToast = (type: "success" | "error", message: string) => {
    toast.custom((t) => (
      <CustomToast type={type} message={message} t={t} />
    ));
  };

  // 🔥 MASK CEP
  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  // 🔥 AUTH + FIREBASE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
  setLoading(false);
  navigate("/"); // 🔥 só redireciona
  return;
}

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          showToast("error", "Usuário não encontrado");
          return;
        }

        const data: any = docSnap.data();

        const addressData = {
  cep: maskCEP(data.cep || ""),
  address: data.address || "",
  bairro: data.bairro || "",
  numero: data.numero || "",
  cidade: data.cidade || "",
  estado: data.estado || "",
};

        setSavedAddress(addressData);
        setForm(addressData);


        setPayer({
  name: data.name || "",
  lastname: data.lastname || "",
  email: data.email || user.email || "",
  cpf: data.cpf || "",
  phone: data.phone || "",
  registrationDate: new Date().toISOString(),
});


      } catch {
        showToast("error", "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 TROCA ENTRE ENDEREÇO
  useEffect(() => {
    if (useDefaultAddress) {
      setForm(savedAddress);
    } else {
      setForm({
  cep: "",
  address: "",
  bairro: "",
  numero: "",
  cidade: "",
  estado: "",
});
    }
  }, [useDefaultAddress, savedAddress]);

  // 🔥 BUSCAR CEP
  const handleCEP = async (value: string) => {
    const raw = value.replace(/\D/g, "");

    setForm((prev) => ({
      ...prev,
      cep: maskCEP(value),
    }));

    if (raw.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();

        if (data.erro) {
          showToast("error", "CEP inválido");
          return;
        }

       setForm((prev) => ({
  ...prev,
  address: data.logradouro || "",
  bairro: data.bairro || "",
  cidade: data.localidade || "",
  estado: data.uf || "",
}));

      } catch {
        showToast("error", "Erro ao buscar CEP");
      }
    }
  };





// 🔥 PRODUCTS
useEffect(() => {
  const ref = collection(db, "products");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const list: any[] = [];

    snapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setProducts(list);
  });

  return () => unsubscribe();
}, []);

// 🔥 OFFERS
useEffect(() => {
  const ref = collection(db, "offers");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const list: any[] = [];

    snapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setOffers(list);
  });

  return () => unsubscribe();
}, []);

// 🔥 CART
useEffect(() => {
  let unsubscribeCart: any;

  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const ref = collection(db, "users", user.uid, "cart");

    unsubscribeCart = onSnapshot(ref, (snapshot) => {
      const list: any[] = [];

      snapshot.forEach((docItem) => {
        const cartData = docItem.data();

        const product = products.find(
          (p) => p.slug === cartData.productId
        );

        if (!product) return;

        const offer = offers.find(
          (o) => o.productId === product.id
        );

        const finalPrice = offer
          ? offer.newPrice
          : product.price;

        list.push({
          id: docItem.id,

          qty: cartData.qty,

          name: product.name,
          image: product.image || product.images?.[0],

          price: finalPrice,
        });
      });

      setCartItems(list);
    });
  });

  return () => {
    unsubscribeAuth();

    if (unsubscribeCart) {
      unsubscribeCart();
    }
  };
}, [products, offers]);


  if (loading) {
    return <div className="checkoutLoading">Carregando...</div>;
  }




  

  return (
    <div className="checkout">
      <div className="checkoutContainer">

        <h2>Finalizar compra</h2>

       {step === 1 && (
  <>

  <div className="checkoutCard">

    <h3>Endereço de entrega</h3>

          {/* SWITCH */}
          <div className="addressOptions">
            <button
              className={useDefaultAddress ? "active" : ""}
              onClick={() => setUseDefaultAddress(true)}
            >
              Usar endereço cadastrado
            </button>

            <button
              className={!useDefaultAddress ? "active" : ""}
              onClick={() => setUseDefaultAddress(false)}
            >
              Entregar em outro endereço
            </button>
          </div>

          {/* FORM */}
          <div className="addressForm">

            <input
              placeholder="CEP"
              value={form.cep}
              onChange={(e) => handleCEP(e.target.value)}
            />

            <input
              placeholder="Endereço"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <div className="grid2">
              <input
                placeholder="Bairro"
                value={form.bairro}
                onChange={(e) =>
                  setForm({ ...form, bairro: e.target.value })
                }
              />

              <input
                placeholder="Número"
                value={form.numero}
                onChange={(e) =>
                  setForm({ ...form, numero: e.target.value })
                }
              />
            </div>


            <div className="grid2">
  <input
    placeholder="Cidade"
    value={form.cidade}
    onChange={(e) =>
      setForm({ ...form, cidade: e.target.value })
    }
  />

  <input
    placeholder="Estado"
    maxLength={2}
    value={form.estado}
    onChange={(e) =>
      setForm({
        ...form,
        estado: e.target.value.toUpperCase(),
      })
    }
  />
</div>

          </div>

       
    </div>

<div className="checkoutActions">

  <button
    className="backBtn"
    onClick={() => navigate(-1)}
  >
    Voltar
  </button>

  <button
    className="confirmBtn"
    onClick={() => {

     if (
  !form.cep ||
  !form.address ||
  !form.numero ||
  !form.bairro ||
  !form.cidade ||
  !form.estado
) {
  showToast("error", "Preencha todos os campos do endereço");
  return;
}

      setStep(2);

    }}
  >
    Continuar
  </button>

</div>

</>
)}

{step === 2 && (
  <div className="checkoutStep2">

    <div className="checkoutGrid">

      {/* CARD RESUMO */}
      <div className="checkoutCard">
        <h3>Resumo do pedido</h3>

      <div className="summaryBox">

 <div className="summaryItems">

  {cartItems.map((item) => (
    <div className="summaryItem" key={item.id}>
      <div className="itemLeft">

        <img src={item.image} alt={item.name} />

        <div>
          <p>{item.name}</p>
          <span>Qtd: {item.qty}</span>
        </div>

      </div>

      <strong>
        {formatPrice(item.price * item.qty)}
      </strong>
    </div>
  ))}

</div>

  <div className="summaryTotal">
    <span>Total</span>
   <strong>{formatPrice(total)}</strong>
  </div>

</div>
      </div>

      {/* CARD INFO */}
      <div className="checkoutCard">
        <h3>Entrega</h3>

        <div className="userInfo">
          <span>{form.address}</span>
          <span>{form.bairro}</span>
          <span>Nº {form.numero}</span>
        </div>

        <h3 className="paymentTitle">Pagamento</h3>

<div className="paymentOptions">

  <button
    className={paymentMethod === "pix" ? "active" : ""}
    onClick={() => setPaymentMethod("pix")}
  >
    PIX
  </button>

  <button
    className={paymentMethod === "debit" ? "active" : ""}
    onClick={() => setPaymentMethod("debit")}
  >
    Débito
  </button>

  <button
    className={paymentMethod === "credit" ? "active" : ""}
    onClick={() => setPaymentMethod("credit")}
  >
    Crédito
  </button>

</div>

       <div className="paymentContent">

  {/* PIX */}
  {paymentMethod === "pix" && (
    <div className="pixBox">
      QR Code será gerado na próxima etapa
    </div>
  )}

  {/* DÉBITO / CRÉDITO */}
  {(paymentMethod === "debit" || paymentMethod === "credit") && (
  <MercadoPagoBrick
    amount={total}
    items={cartItems}
    payer={payer}
    shippingAddress={form}
  />
)}

</div>
      </div>

    </div>

    {/* BOTÃO FORA */}
    <div className="checkoutActions">
     <div className="checkoutActions">

  <button
    className="backBtn"
    onClick={() => setStep(1)}
  >
    Voltar
  </button>

 <button
  className="confirmBtn"
  onClick={async () => {

    if (paymentMethod === "pix") {

      try {

        setPixLoading(true);

      const response = await api.post(
  "/api/payment/pix",
  {
    items: cartItems,
    total,
  }
);

        setPixData(response.data);

navigate("/payment/pix", {
  state: {
    pixData: response.data
  }
});

console.log(response.data);

      } catch (error) {

        console.log(error);

        showToast("error", "Erro ao gerar PIX");

      } finally {

        setPixLoading(false);

      }
    }

  }}
>
  {pixLoading ? "Gerando PIX..." : "Confirmar pedido"}
</button>

</div>
    </div>

  </div>
)}


{pixLoading && (

  <div className="pixLoadingOverlay">

    <div className="pixLoadingCard">

      <div className="pixSpinner"></div>

      <h3>Gerando PIX...</h3>

      <p>
        Aguarde enquanto preparamos seu pagamento.
      </p>

    </div>

  </div>

)}


      </div>


      
    </div>
  );
}