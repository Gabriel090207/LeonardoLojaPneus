import "./CartSidebar.css";
import {
  FiX,
  FiTrash2,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../services/firebase";

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export default function CartSidebar({ open, onClose }: any) {
  const navigate = useNavigate();

  const [closing, setClosing] = useState(false);

  const [items, setItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  // 🔥 PRODUCTS REALTIME
  useEffect(() => {
    const ref = collection(db, "products");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const list: any[] = [];

      snapshot.forEach((docItem) => {
        list.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setProducts(list);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 OFFERS REALTIME
  useEffect(() => {
    const ref = collection(db, "offers");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const list: any[] = [];

      snapshot.forEach((docItem) => {
        list.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setOffers(list);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 CART REALTIME
  useEffect(() => {
    let unsubscribeCart: any;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setItems([]);
        return;
      }

      const ref = collection(db, "users", user.uid, "cart");

      unsubscribeCart = onSnapshot(ref, (snapshot) => {
        const list: any[] = [];

        snapshot.forEach((docItem) => {
          const cartData = docItem.data();

          // 🔥 ACHA PRODUTO
          const product = products.find(
            (p) => p.slug === cartData.productId
          );

          if (!product) return;

          // 🔥 ACHA OFERTA
          const offer = offers.find(
            (o) => o.productId === product.id
          );

          // 🔥 PREÇO FINAL
          const finalPrice = offer
            ? offer.newPrice
            : product.price;

          list.push({
            id: docItem.id,

            productId: cartData.productId,
            qty: cartData.qty,

            name: product.name,
            image: product.image || product.images?.[0],

            price: finalPrice,

            oldPrice: offer?.oldPrice || null,
            isOffer: !!offer,
          });
        });

        setItems(list);
      });
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeCart) {
        unsubscribeCart();
      }
    };
  }, [products, offers]);

  // 🔥 REMOVER ITEM
  const removeItem = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "cart", id)
    );
  };

  // 🔥 ALTERAR QUANTIDADE
  const updateQty = async (
    id: string,
    newQty: number
  ) => {
    if (newQty < 1) return;

    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(
      db,
      "users",
      user.uid,
      "cart",
      id
    );

    await updateDoc(ref, {
      qty: newQty,
    });
  };

  // 🔥 TOTAL REALTIME
  const total = items.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;

    return acc + price * qty;
  }, 0);

  // 🔥 FECHAR
  const handleClose = () => {
    if (!open || closing) return;

    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  // 🔥 CHECKOUT
  const handleCheckout = () => {
    if (closing) return;

    setClosing(true);

    setTimeout(() => {
      onClose();
      navigate("/checkout");
    }, 300);
  };

  // 🔥 FORMATAR PREÇO
  const formatPrice = (value: number) => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`cartOverlay ${
          open ? "active" : ""
        } ${closing ? "closing" : ""}`}
        onClick={handleClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`cartSidebar ${
          open ? "open" : ""
        } ${closing ? "closing" : ""}`}
      >
        {/* HEADER */}
        <div className="cartHeader">
          <h3>Carrinho</h3>

          <button onClick={handleClose}>
            <FiX />
          </button>
        </div>

        {/* ITEMS */}
        <div className="cartItems">
          {items.length === 0 && (
            <p style={{ color: "#aaa" }}>
              Seu carrinho está vazio
            </p>
          )}

          {items.map((item) => (
            <div className="cartItem" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cartItem__info">
                <h4>{item.name}</h4>

                {/* 🔥 QUANTIDADE */}
                <div className="qtyControl">
                  <button
                    onClick={() =>
                      updateQty(
                        item.id,
                        item.qty - 1
                      )
                    }
                  >
                    <FiMinus />
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() =>
                      updateQty(
                        item.id,
                        item.qty + 1
                      )
                    }
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* 🔥 PREÇO */}
                {item.isOffer && (
                  <span className="cartItem__oldPrice">
  {formatPrice(item.oldPrice)}
</span>
                )}

                <strong>
                  {formatPrice(item.price)}
                </strong>
              </div>

              {/* REMOVER */}
              <button
                className="removeBtn"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="cartFooter">
          <div className="cartTotal">
            <span>Total</span>

            <strong>
              {formatPrice(total)}
            </strong>
          </div>

          <button
            className="checkoutBtn"
            onClick={handleCheckout}
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </>
  );
}