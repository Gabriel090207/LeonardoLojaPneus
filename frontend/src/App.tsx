import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

function App() {
  return (
    <BrowserRouter>



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
          path="/produto/:id"
          element={<ProductDetails />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App