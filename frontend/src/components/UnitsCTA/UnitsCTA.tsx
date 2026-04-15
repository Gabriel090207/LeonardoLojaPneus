import './UnitsCTA.css'
import { FiMapPin, FiArrowRight } from 'react-icons/fi'

function UnitsCTA() {
  return (
    <section className="units-cta">
      <div className="container">
        <div className="units-cta__box">
          <div className="units-cta__icon">
            <FiMapPin />
          </div>

        

          <h2>Encontre a unidade mais próxima</h2>

          <p>
            Estamos preparados para atender você em mais de uma loja com
            estrutura completa, equipe especializada e atendimento rápido.
          </p>

          <a href="/unidades" className="units-cta__button">
            Ver unidades
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}

export default UnitsCTA