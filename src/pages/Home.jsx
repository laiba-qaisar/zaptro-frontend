import React from 'react'
import Carousal from '../components/Carousal'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
    <Carousal/>
    <MidBanner/>
    <Features/>
    </div>
  )

}

export default Home