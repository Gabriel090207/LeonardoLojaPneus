import './FeaturedProducts.css'
import productTire from '../../assets/product-tire.png'

import { Link } from 'react-router-dom'

function FeaturedProducts() {
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
 
]

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
         
          <h2>Confira os  <span className="text-red">Produtos</span> em destaque</h2>
          <p>
            Confira alguns dos modelos mais procurados com excelente custo-benefício.
          </p>
        </div>

        <div className="featured-products__grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-card__image">
                <img src={productTire} alt={product.name} />
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
            </div>
          ))}
        </div>


<div className="featured-products__footer">
<Link
  to="/pneus"
  className="featured-products__more-button"
>
  Ver todos os produtos
</Link>
</div>

      </div>
    </section>
  )
}

export default FeaturedProducts