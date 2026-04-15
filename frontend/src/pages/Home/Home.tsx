
import Hero from '../../components/Hero/Hero'
import Categories from '../../components/Categories/Categories'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Benefits from '../../components/Benefits/Benefits'
import Brands from '../../components/Brands/Brands'
import Services from '../../components/Services/Services'
import UnitsCTA from '../../components/UnitsCTA/UnitsCTA'

import SectionDivider from '../../components/SectionDivider/SectionDivider'


import './Home.css'

function Home() {
  return (
    <div className="home">
     

     <main className="home__content">
  <Hero />
  <Categories />
  <SectionDivider />
  <FeaturedProducts />
  <Benefits />
  <Services />
   <SectionDivider />
  <Brands />
  <UnitsCTA />
 
  
</main>
    </div>
  )
}

export default Home