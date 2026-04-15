import './Header.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from 'react-icons/fi'
import logo from '../../assets/logo.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="header">
        {/* DESKTOP */}
        <div className="header__desktop">
          <div className="header__top">
            <div className="container header__top-container">
              <Link to="/" className="header__logo-link">
                <img
                  src={logo}
                  alt="Prime Pneus Gold Black"
                  className="header__logo"
                />
              </Link>

              <div className="header__search">
                <input
                  type="text"
                  placeholder="Buscar medidas, marcas ou modelos"
                  className="header__search-input"
                />

                <button className="header__search-button">
                  <FiSearch />
                </button>
              </div>

              <div className="header__actions">
                <button className="header__action-button">
                  <FiUser />
                  <span>Entrar</span>
                </button>

                <button className="header__cart-button">
                  <FiShoppingCart />
                  <span>Carrinho</span>
                </button>
              </div>
            </div>
          </div>

          <div className="header__bottom">
            <div className="container header__bottom-container">
              <nav className="header__nav">
                <Link to="/">Início</Link>
                <Link to="/pneus">Pneus</Link>
                <Link to="/ofertas">Ofertas</Link>
                <Link to="/servicos">Serviços</Link>
                <Link to="/unidades">Unidades</Link>
                <Link to="/contato">Contato</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* MOBILE */}
        <div className="header__mobile">
          <button
            className="mobile-icon-btn"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu />
          </button>

          <div className="header__search mobile-search">
            <input
              type="text"
              placeholder="Buscar..."
              className="header__search-input"
            />

            <button className="header__search-button">
              <FiSearch />
            </button>
          </div>

          <button className="mobile-cart-btn">
            <FiShoppingCart />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`mobile-overlay ${menuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* SIDEBAR */}
      <aside
        className={`mobile-sidebar ${menuOpen ? 'active' : ''}`}
      >
        <button className="mobile-close" onClick={closeMenu}>
          <FiX />
        </button>

        <div className="mobile-sidebar__logo">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="mobile-sidebar__nav">
          <Link to="/" onClick={closeMenu}>Início</Link>
          <Link to="/pneus" onClick={closeMenu}>Pneus</Link>
          <Link to="/ofertas" onClick={closeMenu}>Ofertas</Link>
          <Link to="/servicos" onClick={closeMenu}>Serviços</Link>
          <Link to="/unidades" onClick={closeMenu}>Unidades</Link>
          <Link to="/contato" onClick={closeMenu}>Contato</Link>
        </nav>

        <button className="mobile-login-btn">
          <FiUser />
          Entrar
        </button>
      </aside>
    </>
  )
}

export default Header