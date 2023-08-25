import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { createContext, useEffect, useState } from 'react'
import Nav from './pages/Nav'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import About from './pages/About'
import OrderConfirmation from './pages/OrderConfirmation'
import MyProfile from './pages/MyProfile'
import OrderHistory from './Components/OrderHistory'
import Error from './pages/Error'
import Admin from './pages/Admin'
import Home from './pages/Home'
import GuestOrder from './pages/GuestOrder'

export const LoggedInContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState();

  async function checkToken() {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const response = await fetch('https://airbeanprojectbackend.onrender.com/api/user/checktoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ _id: userId })
    });
    const data = await response.json();
    if (data.success) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }

  useEffect(() => {
    checkToken()
  }, [])


  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Routes>
          
          <Route path="/nav" element={<Nav />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/order" element={<Cart />}></Route>
          <Route path="/order/guest" element={<GuestOrder />}></Route>
          <Route path="/order/confirmation" element={<OrderConfirmation />}></Route>
          <Route path='/profile' element={<MyProfile></MyProfile>}></Route>
          <Route path="/user/orderhistory" element={<OrderHistory />}></Route>
          <Route path="/error" element={<Error />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Navigate to="/error" />}></Route>
        </Routes>
      </BrowserRouter>
    </LoggedInContext.Provider>
  )
}

export default App
