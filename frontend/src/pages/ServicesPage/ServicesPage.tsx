import './ServicesPage.css'
import {
  FiCompass,
  FiTarget,
  FiDisc,
  FiSettings,
  FiDroplet,
  FiBatteryCharging,
  FiTool,
  FiShield,
  FiMapPin,
} from 'react-icons/fi'

function ServicesPage() {
  const services = [
    {
      icon: <FiCompass />,
      title: 'Alinhamento 3D',
      text: 'Tecnologia de ponta para estabilidade, direção precisa e menor desgaste dos pneus.',
    },
    {
      icon: <FiTarget />,
      title: 'Balanceamento',
      text: 'Elimine vibrações e aumente o conforto com ajuste ideal das rodas.',
    },
    {
      icon: <FiDisc />,
      title: 'Freios',
      text: 'Revisão completa, troca de componentes e máxima segurança na frenagem.',
    },
    {
      icon: <FiSettings />,
      title: 'Suspensão',
      text: 'Diagnóstico e manutenção para mais estabilidade e conforto ao dirigir.',
    },
    {
      icon: <FiDroplet />,
      title: 'Troca de óleo',
      text: 'Lubrificantes premium para proteger o motor e melhorar performance.',
    },
    {
      icon: <FiBatteryCharging />,
      title: 'Bateria',
      text: 'Baterias novas com garantia e instalação rápida na unidade.',
    },
    {
      icon: <FiTool />,
      title: 'Caixa de direção',
      text: 'Manutenção especializada para direção leve, segura e precisa.',
    },
    {
      icon: <FiShield />,
      title: 'Check-up preventivo',
      text: 'Avaliação geral do veículo para prevenir falhas e gastos futuros.',
    },
  ]

  return (
    <section className="services-page">
      <div className="container">
        {/* TOPO PADRÃO */}
        <div className="services-page__hero">
          <span className="page__badge">Serviços</span>

          <h1>
            Tudo que seu carro precisa em{' '}
            <span className="text-red">um só lugar</span>
          </h1>
        </div>

        {/* GRID */}
        <div className="services-page__grid">
          {services.map((item, index) => (
            <article className="service-card" key={index}>
              <div className="service-card__icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <button className="service-card__button">
                Contratar agora
              </button>
            </article>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="services-page__cta">
          <div>
            <h2>Encontre a unidade mais próxima</h2>
            <p>Estrutura completa e atendimento rápido perto de você.</p>
          </div>

          <a href="/unidades" className="services-page__cta-button">
            <FiMapPin />
            Ver unidades
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage