import './Footer.css'
import logo from '../../assets/logo.png'

import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
  FiCreditCard,
  FiFileText,
  FiShield,
} from 'react-icons/fi'

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
              Av. Exemplo, 1234
              <br />
              Campo Grande - MS
            </span>
          </div>

          <div className="footer__info">
            <FiClock />
            <span>
              Segunda à Sexta: 08h às 18h
              <br />
              Sábado: 08h às 12h
            </span>
          </div>

          <div className="footer__info">
            <FiPhone />
            <span>(67) 99999-9999</span>
          </div>
        </div>

        <div className="footer__column">
          <h3>Links rápidos</h3>

          <a href="/">Início</a>
          <a href="/produtos">Produtos</a>
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
                <FiShield />
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
              <a href="#" className="footer__social-item">
                <FiInstagram />
              </a>

              <a href="#" className="footer__social-item">
                <FiFacebook />
              </a>

              <a href="#" className="footer__social-item">
                <FiMessageCircle />
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