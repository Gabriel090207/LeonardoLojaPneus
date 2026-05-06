import { useEffect, useState } from "react";
import "./OfferModal.css";

import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function OfferModal({ onClose, onSave }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [priceInput, setPriceInput] = useState(""); // 👈 máscara
  const [priceValue, setPriceValue] = useState<number | null>(null); // 👈 valor real

  // 🔥 carregar produtos
  useEffect(() => {
    const loadProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(data);
    };

    loadProducts();
  }, []);

  // 💰 função máscara BRL
  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    const number = Number(numbers) / 100;

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  // 💰 handle input
  const handlePriceChange = (e: any) => {
    const raw = e.target.value;

    const numbers = raw.replace(/\D/g, "");
    const number = Number(numbers) / 100;

    setPriceValue(number);
    setPriceInput(formatCurrency(raw));
  };

  return (
    <div className="offerModalOverlay">

      <div className="offerModal">

        {/* HEADER */}
        <div className="offerModalHeader">
          <h2>Nova Oferta</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="offerModalBody">

          {/* SELECT PRODUTO */}
          <div className="offerSelectWrapper">
            <select
              className="offerSelectInput"
              onChange={(e) => {
                const product = products.find(p => p.id === e.target.value);
                setSelectedProduct(product);
              }}
            >
              <option value="">Selecione um produto</option>

              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* GRID PREÇOS */}
          <div className="offerGrid2">

            {/* PREÇO ANTIGO */}
            <input
              type="text"
              disabled
              placeholder="Preço atual"
              value={
                selectedProduct
                  ? Number(selectedProduct.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })
                  : ""
              }
            />

            {/* NOVO PREÇO COM MÁSCARA */}
            <input
              type="text"
              placeholder="Novo preço"
              value={priceInput}
              onChange={handlePriceChange}
            />

          </div>

        </div>

        {/* FOOTER */}
        <div className="offerModalFooter">

          <button className="offerBtnCancel" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="offerBtnSave"
            onClick={() => {
              if (!selectedProduct || !priceValue) return;

              onSave({
                productId: selectedProduct.id,
                name: selectedProduct.name,
                oldPrice: selectedProduct.price,
                newPrice: priceValue // 👈 número limpo
              });
            }}
          >
            Criar Oferta
          </button>

        </div>

      </div>
    </div>
  );
}