import './Tires.css'
import { FiChevronDown, FiSearch } from 'react-icons/fi'
import tireImg from '../../assets/product-tire.png'
import { Link } from 'react-router-dom'

function Tires() {
  const products = [
    {
      id: 1,
      name: 'Pneu Aro 15 Performance',
      price: 'R$ 499,90',
      installment: '10x de R$ 49,99 sem juros',
      benefits: [
        'Alta durabilidade',
        'Garantia de 5 anos',
        'Certificado Inmetro',
      ],
    },
    {
      id: 2,
      name: 'Pneu SUV Premium Grip',
      price: 'R$ 589,90',
      installment: '10x de R$ 58,99 sem juros',
      benefits: [
        'Maior estabilidade',
        'Excelente aderência',
        'Uso urbano e estrada',
      ],
    },
    {
      id: 3,
      name: 'Pneu Caminhonete All Road',
      price: 'R$ 649,90',
      installment: '10x de R$ 64,99 sem juros',
      benefits: [
        'Resistente a carga',
        'Tração reforçada',
        'Longa vida útil',
      ],
    },
    {
      id: 4,
      name: 'Pneu Aro 15 Performance',
      price: 'R$ 499,90',
      installment: '10x de R$ 49,99 sem juros',
      benefits: [
        'Alta durabilidade',
        'Garantia de 5 anos',
        'Certificado Inmetro',
      ],
    },
    {
      id: 5,
      name: 'Pneu SUV Premium Grip',
      price: 'R$ 589,90',
      installment: '10x de R$ 58,99 sem juros',
      benefits: [
        'Maior estabilidade',
        'Excelente aderência',
        'Uso urbano e estrada',
      ],
    },
    {
      id: 6,
      name: 'Pneu Caminhonete All Road',
      price: 'R$ 649,90',
      installment: '10x de R$ 64,99 sem juros',
      benefits: [
        'Resistente a carga',
        'Tração reforçada',
        'Longa vida útil',
      ],
    },
  ]

  return (
    <section className="tires-page">
      <div className="container">
        {/* HERO */}
        <div className="tires-hero">
          <span className="page__badge">Pneus</span>

          <h1>
            Encontre o <span className="text-red">pneu ideal</span> para seu
            veículo
          </h1>
        </div>

        {/* TOPBAR */}
        <div className="tires-topbar">
          <span className="tires-results">128 produtos encontrados</span>

          <button className="tires-order">
            Mais relevantes
            <FiChevronDown />
          </button>
        </div>

        {/* CONTENT */}
        <div className="tires-layout">
          {/* SIDEBAR */}
          <aside className="tires-sidebar">
            <h3>Filtrar busca</h3>

            <div className="filter-group">
              <label>Buscar</label>

              <div className="filter-search">
                <input type="text" placeholder="Medida ou marca" />
                <FiSearch />
              </div>
            </div>

            <div className="filter-group">
              <label>Marca</label>
              <select>
                <option>Todas</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Aro</label>
              <select>
                <option>Todos</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Categoria</label>
              <select>
                <option>Todas</option>
              </select>
            </div>

            <button className="btn-primary filter-button">
              Aplicar filtros
            </button>
          </aside>

          {/* PRODUCTS */}
          <div className="tires-products">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__image">
                  <img src={tireImg} alt={product.name} />
                </div>

                <div className="product-card__content">
                  <h3>{product.name}</h3>

                  <ul className="product-card__benefits">
                    {product.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>

                  <span className="product-card__price">
                    {product.price}
                  </span>

                  <span className="product-card__installment">
                    {product.installment}
                  </span>

                 <Link
  to={`/produto/${product.id}`}
  className="product-card__button"
>
  Ver detalhes
</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tires