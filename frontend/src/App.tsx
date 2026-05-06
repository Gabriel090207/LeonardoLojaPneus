import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

import { CartProvider } from "./context/CartContext";
import { CartUIProvider } from "./context/CartUIContext";

function App() {
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

      
      <Header />

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
      </Routes>


      <Footer />
    </BrowserRouter>
    </CartUIProvider>
    </CartProvider>
  )
}

export default App