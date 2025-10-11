import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CoinPage from '../components/CoinPage'
import BackButton from '../components/BackButton'

const Crypto = () => {
  return (
    <>
      <Navbar/>
      <CoinPage/> 
      <Footer/>
      <BackButton/>
    </>
  )
}

export default Crypto