import './Units.css'

import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import unit1Img from '../../assets/unit1.png'
import unit2Img from '../../assets/unit2.png'
import unit3Img from '../../assets/unit3.png'
import unit4Img from '../../assets/unit4.png'
import unit5Img from '../../assets/unit5.png'

function Units() {

  const units = [
    {
      id: 1,
      title: 'Loja 1',

      image: unit1Img,

      address:
        'Av. Cônsul Assaf Trad, 4318 - Mata do Jacinto, Campo Grande - MS',

      phone: '(67) 3014-3800',

      whatsapp: '(67) 9 9686-5264',

      hours: 'Seg a Sex: 07h30 às 17h30 • Sáb: 07h30 às 12h',
    },

    {
      id: 2,
      title: 'Loja 2',

      image: unit2Img,

      address:
        'Av. Ceará, 2732 - Vila Antônio Vendas, Campo Grande - MS',

      phone: '(67) 3014-3800',

      whatsapp: '(67) 9 9686-5264',

      hours: 'Seg a Sex: 07h30 às 17h30 • Sáb: 07h30 às 12h',
    },

    {
      id: 3,
      title: 'Loja 3',

      image: unit3Img,

      address:
        'Av. Gunter Hans, 3729 - Conj. Aero Rancho, Campo Grande - MS',

      phone: '(67) 3014-3800',

      whatsapp: '(67) 9 9686-5264',

      hours: 'Seg a Sex: 07h30 às 17h30 • Sáb: 07h30 às 12h',
    },

    {
      id: 4,
      title: 'Loja 4',

      image: unit4Img,

      address:
        'R. Ipamerim, 800 - Moreninha, Campo Grande - MS',

      phone: '(67) 3014-3800',

      whatsapp: '(67) 9 9686-5264',

      hours: 'Seg a Sex: 07h30 às 17h30 • Sáb: 07h30 às 12h',
    },

    {
      id: 5,
      title: 'Fábrica / Distribuidora',

      image: unit5Img,

      address:
        'Av. Cônsul Assaf Trad, 4318 - Campo Grande - MS',

      phone: '(67) 3014-3800',

      whatsapp: '(67) 9 9686-5264',

      hours: 'Seg a Sex: 07h30 às 17h30',
    },
  ]


const getWhatsAppLink = () => {
  return "https://api.whatsapp.com/send/?phone=556730143800&text=Ol%C3%A1%2C+quero+saber+mais+sobre+os+pneus&type=phone_number&app_absent=0"
}

  const getMapsLink = (address: string) => {
    const encoded = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encoded}`
  }

  const openRoute = (address: string) => {

    if (!navigator.geolocation) {
      window.open(getMapsLink(address), "_blank")
      return
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude
        const lng = position.coords.longitude

        const destination = encodeURIComponent(address)

        const url =
          `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${destination}`

        window.open(url, "_blank")
      },

      () => {
        window.open(getMapsLink(address), "_blank")
      }

    )
  }

  return (
    <section className="units-page">

      <div className="container">

        {/* HERO */}
        <div className="units-page__hero">

          <span className="page__badge">
            Unidades
          </span>

          <h1>
            Encontre a{" "}
            <span className="text-red">
              unidade ideal
            </span>{" "}
            para você
          </h1>

        </div>

        {/* LIST */}
        <div className="units-page__list">

          {units.map((unit) => (

            <article
              className="unit-card"
              key={unit.id}
            >

              <div className="unit-card__image">
                <img
                  src={unit.image}
                  alt={unit.title}
                />
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

                  <button
                    onClick={() => openRoute(unit.address)}
                    className="btn-outline1"
                  >
                    Ver rota
                  </button>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary1"
                  >
                    <FaWhatsapp />
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