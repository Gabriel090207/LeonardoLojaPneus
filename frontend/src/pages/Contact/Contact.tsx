import './Contact.css'
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiMessageCircle,
} from 'react-icons/fi'

function Contact() {
  return (
    <section className="contact-page">
      <div className="container">
        {/* TOPO PADRÃO */}
        <div className="contact-page__hero">
          <span className="page__badge">Contato</span>

          <h1>
            Fale com nossa <span className="text-red">equipe</span>
          </h1>
        </div>

        {/* CONTENT */}
        <div className="contact-page__layout">
          {/* FORM */}
          <div className="contact-form">
            <h2>Envie sua mensagem</h2>

            <div className="contact-form__grid">
              <input type="text" placeholder="Seu nome" />
              <input type="text" placeholder="Telefone" />
            </div>

            <input type="email" placeholder="Seu e-mail" />

            <input type="text" placeholder="Assunto" />

            <textarea rows={6} placeholder="Digite sua mensagem" />

            <button className="contact-form__button">
              Enviar mensagem
            </button>
          </div>

          {/* INFO */}
          <div className="contact-info">
            <h2>Informações</h2>

            <div className="contact-info__list">
              <div className="contact-info__item">
                <FiPhone />
                <span>(67) 3014-3800</span>
              </div>

              <div className="contact-info__item">
                <FiMessageCircle />
                <span>(67) 9 9686-5264</span>
              </div>

              <div className="contact-info__item">
                <FiMail />
                <span>contato@primepneus.com.br</span>
              </div>

              <div className="contact-info__item">
                <FiMapPin />
                <span>
                  Av. Cônsul Assaf Trad, 4318
                  <br />
                  Campo Grande - MS
                </span>
              </div>

              <div className="contact-info__item">
                <FiClock />
                <span>
                  Seg a Sex: 08h às 18h
                  <br />
                  Sáb: 08h às 12h
                </span>
              </div>
            </div>

            <div className="contact-social">
              <a href="#">
                <FiInstagram />
              </a>

              <a href="#">
                <FiFacebook />
              </a>

              <a href="#">
                <FiMessageCircle />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact