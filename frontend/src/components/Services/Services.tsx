import './Services.css'
import {
  FiCrosshair,
  FiActivity,
  FiTool,
  FiDisc,
  FiDroplet,
  FiBatteryCharging,
  FiCircle,
  FiCommand,
} from 'react-icons/fi'

function Services() {
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

  return (
    <section className="services">
      <div className="container">
        <div className="section-header">

          <h2>Nossos  <span className="text-red">Serviços</span></h2>
          <p>
            Estrutura completa para cuidar do seu veículo com qualidade e segurança.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <div className="services__item" key={index}>
              <div className="services__icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services