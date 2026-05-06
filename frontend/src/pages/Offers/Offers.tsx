import "./Offers.css";
import offerBanner from "../../assets/ofers-banner.png";

import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

function Offers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // 🔥 BUSCAR PRODUCTS
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

  // 🔥 BUSCAR OFFERS + JUNTAR COM PRODUCTS
  useEffect(() => {
    const ref = collection(db, "offers");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const list: any[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        const product = products.find((p) => p.id === data.productId);

        if (product) {
          list.push({
            id: doc.id,
            ...product,
            oldPrice: data.oldPrice,
            price: data.newPrice,
          });
        }
      });

      setOffers(list);
    });

    return () => unsubscribe();
  }, [products]);

  // 🔥 % DESCONTO
  const getDiscount = (price: number, oldPrice: number) => {
    if (!price || !oldPrice) return "";

    const percent = ((oldPrice - price) / oldPrice) * 100;

    return `${Math.round(percent)}% OFF`;
  };

  // 🔥 PARCELAMENTO
  const getInstallment = (price: number, max = 10) => {
    if (!price) return "";

    const value = price / max;

    return `${max}x de ${value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} sem juros`;
  };

  return (
    <section className="offers-page">
      <div className="container">

        {/* HERO */}
        <div className="offers-hero">
          <img src={offerBanner} alt="Ofertas especiais" />

          <div className="offers-hero__content">
            <span className="page__badge">Ofertas</span>

            <h1>Promoções especiais em pneus</h1>

            <p>
              Aproveite preços exclusivos, estoque limitado e condições imperdíveis.
            </p>
          </div>
        </div>

        {/* 🔥 SEM OFERTAS */}
        {offers.length === 0 && (
          <div className="offers-empty">
            <h3>Nenhuma oferta no momento</h3>
            <p>Volte em breve para conferir novas promoções 🔥</p>
          </div>
        )}

        {/* GRID */}
        <div className="offers-grid">
          {offers.map((product) => (
            <article className="offer-card" key={product.id}>

              <span className="offer-card__badge">
                {getDiscount(product.price, product.oldPrice)}
              </span>

              <div className="offer-card__image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="offer-card__content">
                <h3>{product.name}</h3>

                <ul className="offer-card__benefits">
                  {product.highlights?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <span className="offer-card__old-price">
                  {Number(product.oldPrice).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <span className="offer-card__price">
                  {Number(product.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <span className="offer-card__installment">
                  {getInstallment(product.price)}
                </span>

                <Link
                  to={`/pneus/${product.brandSlug}/${product.slug}`}
                  className="offer-card__button"
                >
                  Aproveitar oferta
                </Link>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Offers;