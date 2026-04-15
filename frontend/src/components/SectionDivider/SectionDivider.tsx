import './SectionDivider.css'
import { GiCarWheel } from 'react-icons/gi'

function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider__line"></span>

      <div className="section-divider__icon">
        <GiCarWheel />
      </div>

      <span className="section-divider__line"></span>
    </div>
  )
}

export default SectionDivider