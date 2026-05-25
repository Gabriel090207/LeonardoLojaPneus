import './Header.css'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi'

import logo from '../../assets/logo.png'
import AuthModal from "../../components/AuthModal/AuthModal";
import CartSidebar from "../CartSidebar/CartSidebar";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";


import toast from "react-hot-toast";
import CustomToast from "../CustomToast/CustomToast";


import { useCartUI } from "../../context/CartUIContext";



function Header({
  globalSearch,
  setGlobalSearch,
}: any) {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false)

 const { cartOpen, openCart, closeCart } = useCartUI();

  const dropdownRef = useRef<any>(null);




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {

      if (userAuth) {
        const uid = userAuth.uid;

        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser({
            uid,
            ...userSnap.data()
          });
        } else {
          setUser({ uid });
        }

      } else {
        setUser(null);
      }

    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
  try {
    await signOut(auth);

    setUser(null);
    closeUserMenu();
    closeCart() // 🔥 evita bug do carrinho aberto

    showToast("success", "Você saiu da conta");

    navigate("/"); // 🔥 AQUI ESTÁ A MÁGICA

  } catch {
    showToast("error", "Erro ao sair");
  }
};


  const showToast = (type: "success" | "error", message: string) => {
  toast.custom(() => (
    <CustomToast type={type} message={message} />
  ));
};


const handleCartClick = () => {
  if (!user) {
    setShowAuth(true); // 🔥 abre login
    return;
  }

 openCart()// 🔥 abre carrinho
};


useEffect(() => {
  const handleClickOutside = (event: any) => {
    if (!userMenuOpen) return; // 🔥 ESSENCIAL

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      closeUserMenu();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [userMenuOpen]); // 🔥 depende do estado

const [closingMenu, setClosingMenu] = useState(false);

const closeUserMenu = () => {
  if (!userMenuOpen || closingMenu) return; // 🔥 CORREÇÃO AQUI

  setClosingMenu(true);

  setTimeout(() => {
    setUserMenuOpen(false);
    setClosingMenu(false);
  }, 200);
};

useEffect(() => {
  const openCartFromProduct = () => {
    openCart()
  };

  window.addEventListener("open-cart", openCartFromProduct);

  return () => {
    window.removeEventListener("open-cart", openCartFromProduct);
  };
}, []);






  return (
    <>
      <header className="header">

        {/* DESKTOP */}
        <div className="header__desktop">
          <div className="header__top">
            <div className="container header__top-container">

              <Link to="/" className="header__logo-link">
                <img src={logo} className="header__logo" />
              </Link>

              <div className="header__search">
               <input
  type="text"
  placeholder="Buscar medidas, marcas ou modelos"
  className="header__search-input"
  value={globalSearch}
onChange={(e) => setGlobalSearch(e.target.value)}
/>
                <button className="header__search-button">
                  <FiSearch />
                </button>

                
              </div>



              {/* ACTIONS */}
              <div
  className="header__actions"
  style={{ position: "relative" }}
  ref={dropdownRef}
>

                {user ? (
                  <>
                    <div
                      className="headerAvatar"
                      onClick={() => {
  if (userMenuOpen) {
    closeUserMenu(); // 🔥 fecha com animação
  } else {
    setUserMenuOpen(true); // 🔥 abre normal
  }
}}
                    >
                      {user.name?.slice(0,1)}
                      {user.lastname?.slice(0,1)}
                    </div>

                    {(userMenuOpen || closingMenu) && (
<div className={`userDropdown ${closingMenu ? "closing" : "open"}`}>

                       <button
  className="dropdownItem"
  onClick={() => {
    closeUserMenu();   // 🔥 fecha dropdown com animação
    closeCart() // 🔥 garante
    navigate("/conta"); // 🔥 vai pra conta
  }}
>
  <FiUser />
  <span>Minha conta</span>
</button>

                        <button
  className="dropdownItem logout"
  onClick={handleLogout}
>
                          <FiLogOut />
                          <span>Sair</span>
                        </button>

                      </div>
                    )}
                  </>
                ) : (
                  <button
                    className="header__action-button"
                    onClick={() => setShowAuth(true)}
                  >
                    <FiUser />
                    <span>Entrar</span>
                  </button>
                )}

              <button
  className="header__cart-button"
  onClick={handleCartClick}
>
  <FiShoppingCart />
  <span>Carrinho</span>
</button>

              </div>
            </div>
          </div>

          {/* NAV */}
          <div className="header__bottom">
           <div className="container header__bottom-container">
  <nav className="header__nav">

    <Link
      to="/"
      onClick={() => setGlobalSearch("")}
    >
      Início
    </Link>

    <Link
      to="/pneus"
      onClick={() => setGlobalSearch("")}
    >
      Pneus
    </Link>

    <Link
      to="/ofertas"
      onClick={() => setGlobalSearch("")}
    >
      Ofertas
    </Link>

    <Link
      to="/servicos"
      onClick={() => setGlobalSearch("")}
    >
      Serviços
    </Link>

    <Link
      to="/unidades"
      onClick={() => setGlobalSearch("")}
    >
      Unidades
    </Link>

    <Link
      to="/contato"
      onClick={() => setGlobalSearch("")}
    >
      Contato
    </Link>

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
  value={globalSearch}
  onChange={(e) => setGlobalSearch(e.target.value)}
/>
            <button className="header__search-button">
              <FiSearch />
            </button>
          </div>

         <button
  className="mobile-cart-btn"
  onClick={handleCartClick}
>
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
      <aside className={`mobile-sidebar ${menuOpen ? 'active' : ''}`}>

        <button className="mobile-close" onClick={closeMenu}>
          <FiX />
        </button>

        <div className="mobile-sidebar__logo">
          <img src={logo} />
        </div>

      <nav className="mobile-sidebar__nav">

  <Link
    to="/"
    onClick={() => {
      closeMenu();
      setGlobalSearch("");
    }}
  >
    Início
  </Link>

  <Link
    to="/pneus"
    onClick={() => {
      closeMenu();
      setGlobalSearch("");
    }}
  >
    Pneus
  </Link>

  <Link
    to="/ofertas"
    onClick={() => {
      closeMenu();
      setGlobalSearch("");
    }}
  >
    Ofertas
  </Link>

  <Link
    to="/servicos"
    onClick={() => {
      closeMenu();
      setGlobalSearch("");
    }}
  >
    Serviços
  </Link>

  <Link
    to="/unidades"
    onClick={() => {
      closeMenu();
      setGlobalSearch("");
    }}
  >
    Unidades
  </Link>

  <Link
    to="/contato"
    onClick={() => {
      closeMenu();
      setGlobalSearch("");
    }}
  >
    Contato
  </Link>

</nav>

      {user ? (
  <div className="mobile-user-actions">
   <button
  className="mobile-account-btn"
  onClick={() => {
    closeMenu();       // 🔥 fecha sidebar
    closeCart()// 🔥 evita bug
    navigate("/conta"); // 🔥 navega
  }}
>
  <FiUser />
  Ver minha conta
</button>

    <button
      className="mobile-logout-btn"
     onClick={() => {
  handleLogout();
  closeMenu();
}}
    >
      <FiLogOut />
      Sair
    </button>
  </div>
) : (
  <button
    className="mobile-login-btn"
    onClick={() => setShowAuth(true)}
  >
    <FiUser />
    Entrar
  </button>
)}

      </aside>

      {/* MODAL */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={(data: any) => {
            setUser(data);
            setShowAuth(false);
          }}
        />
      )}

      <CartSidebar open={cartOpen} onClose={closeCart} />
    </>

    
  )
}

export default Header