import './ServicesPage.css'
import {
  FiCrosshair,
  FiActivity,
  FiTool,
  FiDisc,
  FiDroplet,
  FiBatteryCharging,
  FiCircle,
  FiCommand,
  FiMapPin,
} from 'react-icons/fi'

function ServicesPage() {

  const services = [
  {
    icon: <FiCrosshair />,
    title: 'Alinhamento 3D',
    text: 'Tecnologia de ponta para garantir a estabilidade do seu veículo.',
  },
  {
    icon: <FiActivity />,
    title: 'Balanceamento',
    text: 'Evite vibrações e desgaste irregular dos pneus.',
  },
  {
    icon: <FiTool />,
    title: 'Suspensão',
    text: 'Revisão completa e troca de componentes.',
  },
  {
    icon: <FiDisc />,
    title: 'Freios',
    text: 'Segurança total na revisão do sistema de freios.',
  },
  {
    icon: <FiDroplet />,
    title: 'Troca de óleo',
    text: 'Lubrificantes de alta performance.',
  },
  {
    icon: <FiBatteryCharging />,
    title: 'Bateria',
    text: 'Com garantia.',
  },
  {
    icon: <FiCircle />,
    title: 'Amortecedores',
    text: 'Novos e recondicionados.',
  },
  {
    icon: <FiCommand />,
    title: 'Caixa de direção',
    text: 'Novos e recondicionados.',
  },
]
  

  const whatsappNumber = "556730143800";

const getWhatsLink = (service: string) => {
  const message = `Olá! Tenho interesse no serviço de ${service}.`;

  return `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(
    message
  )}`;
};

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

              <a
  href={getWhatsLink(item.title)}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Contratar serviço de ${item.title} pelo WhatsApp`}
  className="service-card__button"
>
  Contratar agora
</a>
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