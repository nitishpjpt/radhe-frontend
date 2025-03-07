import React, { useContext } from 'react'
import Banner from '../components/Banner/Banner'
import CardCarousel from '../components/Card/Card'
import HeroSection from '../components/Hero/Hero'
import ProductCarousel from '../components/Products/Products'
import ProductShowcase from '../components/Products/ProductShowCase'
import Testinominal from '../components/Testinominal/Testinominal'


const Home = () => {

 

  return (
     <>

     <Banner/>
     <CardCarousel/>
     <HeroSection/>
     <ProductCarousel/>
     <ProductShowcase/>
     {/* <Testinominal/> */}

     </>
  )
}

export default Home