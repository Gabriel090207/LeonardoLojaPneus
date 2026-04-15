import './Hero.css'
import heroBanner from '../../assets/hero-banner.png'
import { FiShield, FiCreditCard, FiCheckCircle } from 'react-icons/fi'

function Hero() {
  return (
    <section className="hero">
      <img
        src={heroBanner}
        alt="Pneus premium"
        className="hero__background-image"
      />

      <div className="hero__overlay"></div>

      <div className="container hero__container">
        <div className="hero__content">
          <span className="hero__badge">
            Loja oficial • Compra online segura
          </span>

          <h1>
            Pneus premium com segurança, desempenho e procedência para o seu veículo
          </h1>

          <p>
            Encontre as melhores marcas, aproveite condições especiais e compre
            online com mais praticidade e confiança.
          </p>

          <div className="hero__actions">
            <button className="hero__primary-button">
              Comprar agora
            </button>

            <button className="hero__secondary-button">
              Ver ofertas
            </button>
          </div>

          <div className="hero__infos">
  <div className="hero__info-item">
    <FiShield />
    <span>5 anos de garantia</span>
  </div>

  <span className="hero__info-dot"></span>

  <div className="hero__info-item">
    <FiCreditCard />
    <span>Parcelamento facilitado</span>
  </div>

  <span className="hero__info-dot"></span>

  <div className="hero__info-item">
    <FiCheckCircle />
    <span>Produtos certificados</span>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}

export default Hero