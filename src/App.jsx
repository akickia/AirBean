import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Nav from './pages/Nav'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import About from './pages/About'
import OrderConfirmation from './pages/OrderConfirmation'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import OrderHistory from './pages/OrderHistory'
import Error from './pages/Error'
import Admin from './pages/Admin'
import { useState } from 'react'
import Home from './pages/Home'
import GuestOrder from './pages/GuestOrder'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/nav" element={<Nav />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/order" element={<Cart />}></Route>
        <Route path="/order/guest" element={<GuestOrder />}></Route>
        <Route path="/order/confirmation" element={<OrderConfirmation />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/orderhistory" element={<OrderHistory />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Navigate to="/error" />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
