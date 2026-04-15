import './Benefits.css'
import {
  FiShield,
  FiTool,
  FiCreditCard,
  FiCheckCircle,
} from 'react-icons/fi'

function Benefits() {
  const items = [
    {
      icon: <FiShield />,
      title: 'Compra segura',
      text: 'Ambiente protegido e total segurança na sua compra.',
    },
    {
  icon: <FiCheckCircle />,
  title: 'Garantia real',
  text: 'Produtos certificados com garantia de fábrica.',
},
    {
      icon: <FiCreditCard />,
      title: 'Parcelamento facilitado',
      text: 'Pague em até 10x com condições especiais.',
    },
    {
  icon: <FiTool />,
  title: 'Serviços automotivos',
  text: 'Alinhamento, balanceamento e serviços no mesmo lugar.',
},
  ]

  return (
    <section className="benefits">
      <div className="container">
        <div className="section-header">

          <h2>Por que  <span className="text-red">comprar</span> conosco?</h2>
          <p>
            Mais confiança, melhores condições e atendimento focado em resultado.
          </p>
        </div>

        <div className="benefits__grid">
          {items.map((item, index) => (
            <div className="benefits__card" key={index}>
              <div className="benefits__icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits