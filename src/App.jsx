import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Nav from './pages/Nav'
import Menu from './pages/Menu'
import CartGuest from './pages/CartGuest'
import About from './pages/About'
import CartUser from './pages/CartUser'
import OrderConfirmation from './pages/OrderConfirmation'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import OrderHistory from './pages/OrderHistory'
import Error from './pages/Error'
import Admin from './pages/Admin'
import { useState } from 'react'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/nav" element={<Nav />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/order" element={<CartGuest />}></Route>
        <Route path="/user/order" element={<CartUser />}></Route>
        <Route path="/order/confirmation" element={<OrderConfirmation />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user/orderhistory" element={<OrderHistory />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="*" element={<Navigate to="/error" />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
