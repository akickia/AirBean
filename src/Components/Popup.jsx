import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Login from "./Login"
import SignUp from "./SignUp"
import GuestOrder from "../pages/GuestOrder"

export default function Popup({state, action, close}) {
  const [cartPopup, setCartPopup] = useState(state)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showGuestOrder, setShowGuestOrder] = useState(false)
  const navigate = useNavigate()


  return (
    <>
    <section className="popup popup-card">
      <button className="top-btn hide" onClick={() => close(false)}>X</button>
      <h1>Gör ditt val</h1>
      <div className="flex">
      <button onClick={() => setShowLogin(true)}>Logga in</button>
      <button onClick={() => setShowSignup(true)}>Skapa konto</button>
      {cartPopup && <button onClick={() => {setShowGuestOrder(true)}}>Skicka order som gäst</button>}  
      </div>
    </section>
    {showLogin && <Login action={action} close={() => {setShowLogin()}}></Login>}    
    {showSignup && <SignUp close={() => {setShowSignup()}}></SignUp>}
    {showGuestOrder && <GuestOrder close={() => {setShowGuestOrder()}}></GuestOrder>}
    </>
  )
}
