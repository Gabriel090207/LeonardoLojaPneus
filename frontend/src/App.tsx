import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import { useState } from "react";

import { useEffect } from "react";

import { db } from "./services/firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { Toaster } from "react-hot-toast";

import ScrollToTop from './components/ScrollToTop'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Tires from './pages/Tires/Tires'
import Offers from './pages/Offers/Offers'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import Units from './pages/Units/Units'
import Contact from './pages/Contact/Contact'
import ProductDetails from './pages/ProductDetails/ProductDetails'

import About from "./pages/About/About";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import Exchanges from "./pages/Exchanges/Exchanges";
import Shipping from "./pages/Shipping/Shipping";

import Checkout from "./pages/Checkout/Checkout";
import Account from "./pages/Account/Account";

import PixPayment from "./pages/PixPayment/PixPayment";

import { CartProvider } from "./context/CartContext";
import { CartUIProvider } from "./context/CartUIContext";

function App() {


  const [globalSearch, setGlobalSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);


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

useEffect(() => {

  if (!globalSearch.trim()) {
    setSearchResults([]);
    return;
  }

  const term = globalSearch.toLowerCase();

  const filtered = products.filter((product) => {

    return (
      product.name?.toLowerCase().includes(term) ||
      product.brand?.toLowerCase().includes(term) ||
      product.medida?.toLowerCase().includes(term) ||
      product.aro?.toLowerCase().includes(term)
    );

  });

  setSearchResults(filtered);

}, [globalSearch, products]);

  return (

    <CartProvider>
      <CartUIProvider>
    <BrowserRouter>

    <Toaster
  position="top-center"
  containerStyle={{
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 20000,
  }}
/>

      <ScrollToTop />

      
      <Header
  globalSearch={globalSearch}
  setGlobalSearch={setGlobalSearch}
/>


{globalSearch.trim() ? (

  <section className="tires-page">
    <div className="container">

      <div className="tires-products">

        {searchResults.map((product) => (

          <article className="product-card" key={product.id}>

            <div className="product-card__image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="product-card__content">

              <h3>{product.name}</h3>

              <ul className="product-card__benefits">
                {product.highlights?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <span className="product-card__price">
                {Number(product.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>

              <span className="product-card__installment">
  10x de {(Number(product.price) / 10).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} sem juros
</span>

              <Link
                to={`/pneus/${product.brandSlug}/${product.slug}`}
                className="product-card__button"
                onClick={() => setGlobalSearch("")}
              >
                Ver detalhes
              </Link>

            </div>

          </article>

        ))}

      </div>
    </div>
  </section>

) : (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pneus" element={<Tires />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/unidades" element={<Units />} />
        <Route path="/contato" element={<Contact />} />

        {/* NOVA PÁGINA DETALHES */}
        <Route
  path="/pneus/:brand/:slug"
  element={<ProductDetails />}
/>

        <Route path="/sobre" element={<About />} />
<Route path="/termos" element={<Terms />} />
<Route path="/privacidade" element={<Privacy />} />
<Route path="/trocas" element={<Exchanges />} />
<Route path="/entrega" element={<Shipping />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/conta" element={<Account />} />

      <Route path="/payment/pix" element={<PixPayment />} />
      </Routes>

      )}


      <Footer />
    </BrowserRouter>
    </CartUIProvider>
    </CartProvider>
  )
}

export default App