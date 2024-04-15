import React from 'react'
import HeroSection from '../../components/guest/HeroSection'
import BlockOne from '../../components/guest/BlockOne'
import Services from '../../components/guest/Services'
import HappyClients from '../../components/guest/HappyClients'
import Pricing from '../../components/guest/Pricing'
import Testimonials from '../../components/guest/Testimonials'
import { Slide } from 'react-awesome-reveal'
import AppNav from '../../components/guest/AppNav'
import AppFooter from '../../components/guest/AppFooter'

function Homepage(props) {
  return (
    <div>
      <AppNav userType={props.userType} />
      <HeroSection />
      <Slide direction='up' triggerOnce>
        <BlockOne />
      </Slide>
      <Services />
      <HappyClients />
      <Pricing />
      <Testimonials />
      <hr />
      <AppFooter />
    </div>
  )
}

export default Homepage
