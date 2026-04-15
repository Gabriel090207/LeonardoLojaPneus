import './ProductDetails.css'
import { useState } from 'react'
import {
  FiMinus,
  FiPlus,
  FiCheck,
  FiHeart
} from 'react-icons/fi'

import productTire from '../../assets/product-tire.png'

function ProductDetails() {
  const images = [productTire, productTire, productTire, productTire]

  const [selectedImage, setSelectedImage] = useState(images[0])
  const [qty, setQty] = useState(1)

  const increase = () => setQty((prev) => prev + 1)
  const decrease = () =>
    setQty((prev) => (prev > 1 ? prev - 1 : 1))

  const related = [1, 2, 3]

  return (
    <section className="product-details-page">
      <div className="container">
        {/* TOPO */}
        <div className="product-page__hero">
          <span className="page__badge">Produto</span>

          <h1>
            Pneu <span className="text-red">195/55 R15</span>
          </h1>
        </div>

        {/* MAIN */}
        <div className="product-main">
          {/* GALLERY */}
          <div className="product-gallery">
            <div className="product-gallery__main">
              <img src={selectedImage} alt="Pneu" />
            </div>

            <div className="product-gallery__thumbs">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={
                    selectedImage === img
                      ? 'thumb active'
                      : 'thumb'
                  }
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt="Miniatura" />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="product-info">
            <span className="product-info__measure">
              195/55 R15
            </span>

            <h2>Pneu Aro 15 Performance</h2>

            <span className="product-info__price">
              R$ 499,90
            </span>

            <span className="product-info__installment">
              10x de R$ 49,99 sem juros
            </span>

            <ul className="product-info__benefits">
              <li>
                <FiCheck />
                Alta durabilidade
              </li>

              <li>
                <FiCheck />
                Garantia de 5 anos
              </li>

              <li>
                <FiCheck />
                Certificado Inmetro
              </li>
            </ul>

            {/* QUANTITY */}
            <div className="product-qty">
              <span>Quantidade</span>

              <div className="qty-box">
                <button onClick={decrease}>
                  <FiMinus />
                </button>

                <strong>{qty}</strong>

                <button onClick={increase}>
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="product-actions">
              <button className="btn-primary">
                Comprar agora
              </button>

              <button className="btn-outline">
  <FiHeart />
  Favoritar
</button>
            </div>
          </div>
        </div>

        {/* SPECS */}
        <div className="product-specs">
          <h3>Informações técnicas</h3>

          <div className="product-specs__grid">
            <div><span>Marca</span><strong>Prime Tires</strong></div>
            <div><span>Medida</span><strong>195/55 R15</strong></div>
            <div><span>Aro</span><strong>15</strong></div>
            <div><span>Garantia</span><strong>5 anos</strong></div>
            <div><span>Uso</span><strong>Urbano / Rodovia</strong></div>
            <div><span>Certificação</span><strong>Inmetro</strong></div>
          </div>
        </div>

        {/* RELATED */}
        <div className="related-products">
          <h3>Produtos relacionados</h3>

          <div className="related-grid">
            {related.map((item) => (
              <div className="product-card" key={item}>
  <div className="product-card__image">
    <img src={productTire} alt="Produto" />
  </div>

  <div className="product-card__content">
    <h3>Pneu Aro 15 Performance</h3>

    <ul className="product-card__benefits">
      <li>Alta durabilidade</li>
      <li>Garantia de 5 anos</li>
      <li>Certificado Inmetro</li>
    </ul>

    <span className="product-card__price">
      R$ 499,90
    </span>

    <span className="product-card__installment">
      10x de R$ 49,99 sem juros
    </span>

    <button className="product-card__button">
      Ver detalhes
    </button>
  </div>
</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails