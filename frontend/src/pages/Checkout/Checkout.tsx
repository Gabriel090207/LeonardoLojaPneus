import "./Checkout.css";
import { useEffect, useState } from "react";

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
import CustomToast from "../../components/CustomToast/CustomToast";

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [step, setStep] = useState(1);

const [paymentMethod, setPaymentMethod] = useState("pix");
const [cardNumber, setCardNumber] = useState("");
const [cardBrand, setCardBrand] = useState("");

const [cartItems, setCartItems] = useState<any[]>([]);
const [products, setProducts] = useState<any[]>([]);
const [offers, setOffers] = useState<any[]>([]);

  const [savedAddress, setSavedAddress] = useState({
    cep: "",
    address: "",
    bairro: "",
    numero: "",
  });

  const [form, setForm] = useState({
    cep: "",
    address: "",
    bairro: "",
    numero: "",
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
        };

        setSavedAddress(addressData);
        setForm(addressData);

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
        }));

      } catch {
        showToast("error", "Erro ao buscar CEP");
      }
    }
  };



  const detectCardBrand = (number: string) => {
  const cleaned = number.replace(/\D/g, "");

  if (cleaned.startsWith("4")) return "visa";

  if (/^5[1-5]/.test(cleaned)) return "mastercard";

  if (/^3[47]/.test(cleaned)) return "amex";

  if (/^(4011|4312|4389)/.test(cleaned)) return "elo";

  return "";
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

          </div>

          {/* BOTÃO */}
          <div className="checkoutAction">
            <button
              className="nextBtn"
              onClick={() => {
                if (!form.cep || !form.address || !form.numero) {
                  showToast("error", "Preencha todos os campos");
                  return;
                }

                setStep(2);
              }}
            >
              Continuar
            </button>
          </div>

     </div>
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
    <div className="cardForm">

      <div className="cardNumberWrapper">

  <input
    placeholder="Número do cartão"
    value={cardNumber}
    onChange={(e) => {
      const value = e.target.value;

      setCardNumber(value);
      setCardBrand(detectCardBrand(value));
    }}
  />

  {cardBrand && (
    <img
      src={`/src/assets/cards/${cardBrand}.png`}
      alt={cardBrand}
      className="cardBrand"
    />
  )}

</div>

      <input placeholder="Nome no cartão" />

      <div className="grid2">
        <input placeholder="Validade" />
        <input placeholder="CVV" />
      </div>

    </div>
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
    onClick={() => {
      // depois vamos colocar lógica real aqui
      console.log("Confirmar pedido");
    }}
  >
    Confirmar pedido
  </button>

</div>
    </div>

  </div>
)}





      </div>
    </div>
  );
}