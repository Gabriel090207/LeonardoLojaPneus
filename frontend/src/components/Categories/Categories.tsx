import './Categories.css'
import { FiTruck, FiMapPin, FiBox, FiCircle } from 'react-icons/fi'

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-header">

          <h2>Encontre o <span className="text-red">pneu ideal </span> para seu  <span className="text-red">veículo</span></h2>
          <p>
            Navegue pelas principais categorias e encontre rapidamente o modelo
            ideal para sua necessidade.
          </p>
        </div>

        <div className="categories__grid">
          <div className="categories__card">
            <FiCircle />
            <h3>Passeio</h3>
            <p>Modelos ideais para uso urbano e dia a dia.</p>
          </div>

          <div className="categories__card">
            <FiMapPin />
            <h3>SUV</h3>
            <p>Mais estabilidade e performance para utilitários.</p>
          </div>

          <div className="categories__card">
            <FiTruck />
            <h3>Caminhonete</h3>
            <p>Resistência para carga, estrada e trabalho pesado.</p>
          </div>

          <div className="categories__card">
            <FiBox />
            <h3>Utilitário</h3>
            <p>Durabilidade e economia para uso comercial.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Categories