import './Offers.css'
import offerBanner from '../../assets/ofers-banner.png'
import tireImg from '../../assets/product-tire.png'

function Offers() {
  const offers = [
    {
      id: 1,
      name: 'Pneu Aro 15 Performance',
      oldPrice: 'R$ 599,90',
      price: 'R$ 499,90',
      installment: '10x de R$ 49,99 sem juros',
      benefits: ['Alta durabilidade', 'Garantia de 5 anos', 'Certificado Inmetro'],
      badge: '17% OFF',
    },
    {
      id: 2,
      name: 'Pneu SUV Premium Grip',
      oldPrice: 'R$ 689,90',
      price: 'R$ 589,90',
      installment: '10x de R$ 58,99 sem juros',
      benefits: ['Maior estabilidade', 'Excelente aderência', 'Uso urbano e estrada'],
      badge: '15% OFF',
    },
    {
      id: 3,
      name: 'Pneu Caminhonete All Road',
      oldPrice: 'R$ 749,90',
      price: 'R$ 649,90',
      installment: '10x de R$ 64,99 sem juros',
      benefits: ['Resistente a carga', 'Tração reforçada', 'Longa vida útil'],
      badge: '13% OFF',
    },
    {
      id: 4,
      name: 'Pneu Aro 14 Econômico',
      oldPrice: 'R$ 459,90',
      price: 'R$ 379,90',
      installment: '10x de R$ 37,99 sem juros',
      benefits: ['Baixo consumo', 'Uso urbano', 'Excelente custo-benefício'],
      badge: '18% OFF',
    },
    {
      id: 5,
      name: 'Pneu SUV Confort Drive',
      oldPrice: 'R$ 719,90',
      price: 'R$ 629,90',
      installment: '10x de R$ 62,99 sem juros',
      benefits: ['Rodagem silenciosa', 'Conforto premium', 'Maior aderência'],
      badge: '12% OFF',
    },
    {
      id: 6,
      name: 'Pneu Utility Road',
      oldPrice: 'R$ 829,90',
      price: 'R$ 729,90',
      installment: '10x de R$ 72,99 sem juros',
      benefits: ['Alta resistência', 'Ideal para carga', 'Vida útil prolongada'],
      badge: '12% OFF',
    },
  ]

  return (
    <section className="offers-page">
      <div className="container">
        {/* HERO */}
        <div className="offers-hero">
          <img src={offerBanner} alt="Ofertas especiais" />

          <div className="offers-hero__content">
            <span className="page__badge">Ofertas</span>

            <h1>
              Promoções especiais em pneus
            </h1>

            <p>
              Aproveite preços exclusivos, estoque limitado e condições imperdíveis.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="offers-grid">
          {offers.map((product) => (
            <article className="offer-card" key={product.id}>
              <span className="offer-card__badge">{product.badge}</span>

              <div className="offer-card__image">
                <img src={tireImg} alt={product.name} />
              </div>

              <div className="offer-card__content">
                <h3>{product.name}</h3>

                <ul className="offer-card__benefits">
                  {product.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <span className="offer-card__old-price">
                  {product.oldPrice}
                </span>

                <span className="offer-card__price">
                  {product.price}
                </span>

                <span className="offer-card__installment">
                  {product.installment}
                </span>

                <button className="offer-card__button">
                  Aproveitar oferta
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offers