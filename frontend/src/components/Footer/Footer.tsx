import './Footer.css'
import logo from '../../assets/logo.png'

import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiCreditCard,
  FiFileText,
} from 'react-icons/fi'

import { FaWhatsapp } from 'react-icons/fa'
import { FaPix } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
     <div className="footer__top">
        <div className="footer__brand">
          <img src={logo} alt="Prime Pneus" className="footer__logo" />

          <p>
            Soluções completas em pneus e serviços automotivos com qualidade,
            confiança e atendimento especializado para o seu veículo.
          </p>
        </div>

        <div className="footer__column">
          <h3>Informações</h3>

          <div className="footer__info">
            <FiMapPin />
            <span>
              Av. Cônsul Assaf Trad, 4318, Mata do Jacinto
              <br />
              Campo Grande - MS
            </span>
          </div>

          <div className="footer__info">
            <FiClock />
            <span>
              Segunda à Sexta: 07h30 às 17h30
              <br />
              Sábado: 07h30 às 12h
            </span>
          </div>

          <div className="footer__info">
            <FiPhone />
            <span>(67) 9 9686-5264</span>
          </div>
        </div>

        <div className="footer__column">
          <h3>Links rápidos</h3>

          <a href="/">Início</a>
          <a href="/pneus">Pneus</a>
          <a href="/servicos">Serviços</a>
          <a href="/unidades">Unidades</a>
          <a href="/contato">Contato</a>
        </div>

        <div className="footer__column">
          <h3>Institucional</h3>

          <a href="/sobre">Sobre nós</a>
          <a href="/termos">Termos de uso</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/trocas">Trocas</a>
           <a href="/entrega">Entregas</a>
        </div>

        <div className="footer__column footer__extras">
          <div className="footer__mini-block">
            <h3>Pagamento</h3>

            <div className="footer__payments">
              <div className="footer__payment-item">
                <FiCreditCard />
                <span>Cartão</span>
              </div>

              <div className="footer__payment-item">
                <FaPix />
                <span>Pix</span>
              </div>

              <div className="footer__payment-item">
                <FiFileText />
                <span>Boleto</span>
              </div>
            </div>
          </div>

          <div className="footer__mini-block">
            <h3>Redes sociais</h3>

            <div className="footer__social-list">
              <a
  href="https://www.instagram.com/primepneusms"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram da Prime Pneus"
  className="footer__social-item"
>
  <FiInstagram />
</a>

<a
  href="https://www.facebook.com/primepneusms?locale=pt_BR"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Facebook da Prime Pneus"
  className="footer__social-item"
>
  <FiFacebook />
</a>

<a
  href="https://api.whatsapp.com/send/?phone=556730143800&text=Ol%C3%A1%2C+quero+saber+mais+sobre+os+produtos&type=phone_number&app_absent=0"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp da Prime Pneus"
  className="footer__social-item"
>
  <FaWhatsapp />
</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
       <div className="footer__bottom-inner">
          <p>© 2026 Prime Pneus. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer