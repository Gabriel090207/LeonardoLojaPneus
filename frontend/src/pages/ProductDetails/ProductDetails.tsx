import "./ProductDetails.css";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  FiMinus,
  FiPlus,
  FiCheck,
FiChevronLeft,
FiChevronRight
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

import { auth, db } from "../../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

import toast from "react-hot-toast";
import CustomToast from "../../components/CustomToast/CustomToast";


import { useCartUI } from "../../context/CartUIContext";

function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState<any>(null);

  const [media, setMedia] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [qty, setQty] = useState(1);

  const [offer, setOffer] = useState<any>(null);
  const thumbsRef = useRef<any>(null);


  const { openCart } = useCartUI();


  const scrollThumbs = (direction: "left" | "right") => {

  if (!thumbsRef.current) return;

  const amount = 440;

  thumbsRef.current.scrollBy({
    left: direction === "right" ? amount : -amount,
    behavior: "smooth",
  });
};


  const increase = () => setQty((prev) => prev + 1);
  const decrease = () =>
    setQty((prev) => (prev > 1 ? prev - 1 : 1));

  // 🔥 FORMATAR PREÇO
  const formatPrice = (price: number) => {
    return Number(price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getDiscount = () => {
  if (!offer) return null;

  const percent =
    ((offer.oldPrice - offer.newPrice) / offer.oldPrice) * 100;

  return Math.round(percent);
};

  // 🔥 PARCELAMENTO
  const getInstallment = (price: number, max = 10) => {
    if (!price) return "";

    const value = price / max;

    return `${max}x de ${value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })} sem juros`;
  };

  // 🔥 WHATSAPP
  const handleWhats = () => {
    const phone = "5567999999999"; // 🔥 TROCAR PELO SEU

    const text = `Olá! Tenho interesse no produto: ${product?.name}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // 🔥 BUSCAR PRODUTO
  useEffect(() => {
  if (!slug) return;

  const productQuery = query(
    collection(db, "products"),
    where("slug", "==", slug)
  );

  const unsubscribeProduct = onSnapshot(productQuery, (snap) => {
    if (!snap.empty) {
      const docData = snap.docs[0];
      const data = docData.data();

      setProduct(data);

     const imgs = data.images || [];


const mediaItems = [
  ...imgs.map((img: string) => ({
    type: "image",
    url: img,
  })),
];

if (data.video) {
  mediaItems.push({
    type: "video",
    url: data.video,
  });
}

setMedia(mediaItems);

setSelectedMedia(mediaItems[0] || null);

      const productId = docData.id;

      // 🔥 OFERTA REALTIME
      const offerQuery = query(
        collection(db, "offers"),
        where("productId", "==", productId)
      );

      onSnapshot(offerQuery, (offerSnap) => {
        if (!offerSnap.empty) {
          setOffer(offerSnap.docs[0].data());
        } else {
          setOffer(null);
        }
      });
    }
  });

  return () => unsubscribeProduct();
}, [slug]);

  if (!product) {


    return (
      <div className="accountLoading">
        Carregando produto...
      </div>
    );
  }

      const finalPrice = offer ? offer.newPrice : product.price;


const handleAddCart = async () => {
  const user = auth.currentUser;

  if (!user) {
    toast.custom((t) => (
      <CustomToast type="error" message="Faça login para adicionar" t={t} />
    ));
    return;
  }

  const ref = doc(db, "users", user.uid, "cart", product.slug)
  const snap = await getDoc(ref);

  if (snap.exists()) {
    await setDoc(ref, {
  productId: product.slug,
  qty: snap.data().qty + qty,
});
  } else {
    await setDoc(ref, {
  productId: product.slug,
  qty,
});
  }

  toast.custom((t) => (
    <CustomToast type="success" message="Item adicionado ao carrinho" t={t} />
  ));

  openCart(); 
};

  return (
    <section className="product-details-page">
      <div className="container">

        {/* HERO */}
        <div className="product-page__hero">
          <span className="page__badge">Produto</span>

          <h1>
            {product.name}
          </h1>
        </div>

        {/* MAIN */}
        <div className="product-main">

          {/* GALLERY */}
          <div className="product-gallery">

            <div className="product-gallery__main">

  {selectedMedia?.type === "video" ? (

    <video
      src={selectedMedia.url}
      controls
      className="product-main-video"
    />

  ) : (

    <img
      src={selectedMedia?.url}
      alt={product.name}
    />

  )}

</div>

         <div className="thumbsWrapper">

  {media.length > 4 && (
    <button
      className="thumbArrow left"
      onClick={() => scrollThumbs("left")}
    >
      <FiChevronLeft />
    </button>
  )}

  <div
    className="product-gallery__thumbs"
    ref={thumbsRef}
  >

    {media.map((item, index) => (

      <button
        key={index}
        className={
          selectedMedia?.url === item.url
            ? "thumb active"
            : "thumb"
        }
        onClick={() => setSelectedMedia(item)}
      >

        {item.type === "video" ? (

          <div className="videoThumb">

            <video
              src={item.url}
              muted
            />

            <span className="playIcon">
              ▶
            </span>

          </div>

        ) : (

          <img
            src={item.url}
            alt="Miniatura"
          />

        )}

      </button>

    ))}

  </div>

  {media.length > 4 && (
    <button
      className="thumbArrow right"
      onClick={() => scrollThumbs("right")}
    >
      <FiChevronRight />
    </button>
  )}

</div>
          {/* INFO */}
          <div className="product-info">

            <span className="product-info__measure">
              {product.medida}
            </span>

            <h2>{product.name}</h2>

           {offer && (
  <span className="product-info__old-price">
    {formatPrice(offer.oldPrice)}
  </span>
)}

<span className="product-info__price">
  {formatPrice(finalPrice)}
</span>

{offer && (
  <span className="product-info__badge">
    {getDiscount()}% OFF
  </span>
)}

            <span className="product-info__installment">
              {getInstallment(finalPrice)}
              
            </span>

            <ul className="product-info__benefits">
  {product.highlights?.map((item: string, i: number) => (
    <li key={i}>
      <FiCheck />
      {item}
    </li>
  ))}
</ul>

            {/* QUANTITY */}
            <div className="product-qty">
              <span>Quantidade</span>

              <div className="qty-box">
                <button onClick={decrease}>
                  <FiMinus />
                </button>

                <strong>{qty}</strong>

                <button onClick={increase}>
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="product-actions">

              <button className="btn-primary" onClick={handleAddCart}>
  Comprar agora
</button>

              <button
                className="btn-outline whatsapp-btn"
                onClick={handleWhats}
              >
                <FaWhatsapp />
                Falar no WhatsApp
              </button>

            </div>

          </div>
        </div>

        {/* DESCRIÇÃO + SPECS */}
        <div className="product-details-box">

          <div className="product-details__description">
            <h3>Descrição do produto</h3>

            <p>{product.description}</p>
          </div>

          <div className="product-details__specs">

            <h3>Informações técnicas</h3>

            <div className="product-specs__grid">
              <div><span>Marca</span><strong>{product.brand}</strong></div>
              <div><span>Medida</span><strong>{product.medida}</strong></div>
              <div><span>Aro</span><strong>{product.aro}</strong></div>
              <div><span>Garantia</span><strong>{product.garantia}</strong></div>
              <div><span>Uso</span><strong>{product.uso}</strong></div>
              <div><span>Certificação</span><strong>{product.certificacao}</strong></div>
            </div>

          </div>

        </div>

           </div>

    </div>

  </section>
  );
}

export default ProductDetails;