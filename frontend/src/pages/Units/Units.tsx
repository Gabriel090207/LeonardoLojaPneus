import './Units.css'
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'
import unitImg from '../../assets/units-default.jpeg'

function Units() {
  const units = [
    {
      id: 1,
      title: 'Loja 1',
      address:
        'Av. Cônsul Assaf Trad, 4318 - Mata do Jacinto, Campo Grande - MS',
      phone: '(67) 3014-3800',
      whatsapp: '(67) 9 9686-5264',
      hours: 'Seg a Sex: 08h às 18h • Sáb: 08h às 12h',
    },
    {
      id: 2,
      title: 'Loja 2',
      address:
        'Av. Ceará, 2732 - Vila Antônio Vendas, Campo Grande - MS',
      phone: '(67) 3014-3800',
      whatsapp: '(67) 9 9686-5264',
      hours: 'Seg a Sex: 08h às 18h • Sáb: 08h às 12h',
    },
    {
      id: 3,
      title: 'Loja 3',
      address:
        'Av. Gunter Hans, 3729 - Conj. Aero Rancho, Campo Grande - MS',
      phone: '(67) 3014-3800',
      whatsapp: '(67) 9 9686-5264',
      hours: 'Seg a Sex: 08h às 18h • Sáb: 08h às 12h',
    },
    {
      id: 4,
      title: 'Loja 4',
      address:
        'R. Ipamerim, 800 - Moreninha, Campo Grande - MS',
      phone: '(67) 3014-3800',
      whatsapp: '(67) 9 9686-5264',
      hours: 'Seg a Sex: 08h às 18h • Sáb: 08h às 12h',
    },
    {
      id: 5,
      title: 'Fábrica / Distribuidora',
      address:
        'Av. Cônsul Assaf Trad, 4318 - Campo Grande - MS',
      phone: '(67) 3014-3800',
      whatsapp: '(67) 9 9686-5264',
      hours: 'Seg a Sex: 08h às 18h',
    },
  ]

  return (
    <section className="units-page">
      <div className="container">
        {/* HERO */}
        <div className="units-page__hero">
          <span className="page__badge">Unidades</span>

          <h1>
            Encontre a <span className="text-red">unidade ideal</span> para você
          </h1>
        </div>

        {/* LIST */}
        <div className="units-page__list">
          {units.map((unit) => (
            <article className="unit-card" key={unit.id}>
              <div className="unit-card__image">
                <img src={unitImg} alt={unit.title} />
              </div>

              <div className="unit-card__content">
                <h3>{unit.title}</h3>

                <div className="unit-card__info">
                  <span>
                    <FiMapPin />
                    {unit.address}
                  </span>

                  <span>
                    <FiPhone />
                    {unit.phone}
                  </span>

                  <span>
                    <FiClock />
                    {unit.hours}
                  </span>
                </div>

                <div className="unit-card__actions">
                  <a href="#" className="btn-outline">
                    Ver rota
                  </a>

                  <a href="#" className="btn-primary">
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Units