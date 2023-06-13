
import { useNavigate } from "react-router-dom"
import drone from "../assets/drone.svg"


export default function OrderConfirmation() {
  const message = localStorage.getItem("message")
  const navigate = useNavigate()
  return (
    <article className='order-confirmation'>
    <p><small>Ordernummer <b>#12DV23F</b></small></p>  
      <img src={drone} />
      <div>
        <h1>Din beställning är på väg!</h1>
        <h5>{message}</h5>
      </div>
      <button onClick={() => {navigate("/menu")}}>Ok, cool!</button>
    </article>
  )
}
