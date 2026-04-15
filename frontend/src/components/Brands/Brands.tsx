import './Brands.css'

import michelin from '../../assets/brands/michelin.png'
import pirelli from '../../assets/brands/pirelli.png'
import goodyear from '../../assets/brands/goodyear.png'
import bridgestone from '../../assets/brands/bridgestone.png'
import continental from '../../assets/brands/continental.png'
import yokohama from '../../assets/brands/yokohama.png'

function Brands() {
  const brands = [
    michelin,
    pirelli,
    goodyear,
    bridgestone,
    continental,
    yokohama,
  ]

  const loopBrands = [...brands, ...brands]

  return (
    <section className="brands">
      <div className="container">
        <div className="section-header">

          <h2><span className="text-red">Marcas</span> que estão conosco</h2>
          <p>
            Trabalhamos com fabricantes reconhecidos pela qualidade e desempenho.
          </p>
        </div>
      </div>

      <div className="brands__marquee">
        <div className="brands__track">
          {loopBrands.map((logo, index) => (
            <div className="brands__item" key={index}>
              <img src={logo} alt="Marca parceira" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands