import React, { useEffect, useState } from 'react'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import About from './pages/About'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/singleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
function App () {
  const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)
 const { cartItem, setCartItem } = useCart();



  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      // console.log(latitude, longitude)

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

      
      const proxyURL = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`

      try {
        const location = await axios.get(proxyURL)
        console.log(location.data) 
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setTimeout(() => setOpenDropdown(false), 2000)

        // console.log(exactLocation)
   } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  //load cart from local storage
  useEffect(()=> {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  },[])


  //save cart to local storage whwnever it changes
  useEffect(()=> {
   localStorage.setItem('cartItem' , JSON.stringify(cartItem))
  },[cartItem])



  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path='/category/:category' element={<CategoryProduct/>}></Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation}/> 
          </ProtectedRoute>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App