import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header"
import Footer from "../Components/Footer"


export default function GuestOrder( { close }) {
  const [calcProducts, setCalcProducts] = useState(JSON.parse(localStorage.getItem("products")))
  const result = localStorage.getItem("total")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [streetname, setStreetname] = useState()
  const [zipcode, setZipcode] = useState()
  const [city, setCity] = useState()
  const navigate = useNavigate()

  async function sendOrder() { 
    const guestUser = {
      name: name,
      email: email,
      adress: 
        {streetname: streetname,
        zipcode: zipcode,
        city: city}
    }
    const response = await fetch("http://localhost:8000/api/cart/sendguestorder", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(guestUser)
  })
  const data = await response.json();
  if (data.success) {
    localStorage.setItem("items", "")
    let message = data.message
    console.log(message)
    localStorage.setItem("message", message)
    navigate("/order/confirmation")
  } else {
    console.log(data.error)
    navigate("/error")
  }
}



  let productsEl = calcProducts && calcProducts.map((item, i) => {
    return item && <section className="guest-card" key={i}><h4>{item.title}</h4><div><p>{item.price} kr/st</p><p>{item.no} st</p></div></section>
  })

  console.log(calcProducts)

  return (
    <>
      
    <section className="popup">
       <button className="top-btn" onClick={() => close(false)}>X</button>
       <section className='order-view'>
       
        <h1>Skicka gästorder:</h1>
      <form>
        <input type="text" placeholder="Namn" onKeyUp={(e) => setName(e.target.value)}></input>
        <input type="email" placeholder="Email" onKeyUp={(e) => setEmail(e.target.value)}></input>
        <input type="text" placeholder="Gatuadress" onKeyUp={(e) => setStreetname(e.target.value)}></input>
        <input type="number" placeholder="Postnummer" onKeyUp={(e) => setZipcode(e.target.value)}></input>
        <input type="text" placeholder="Postort" onKeyUp={(e) => setCity(e.target.value)}></input>
      </form>
     <hr></hr>
      <h2>Din beställning</h2>
      <section className='cart-container'>
        {productsEl}
        
      </section>
      <hr></hr>
      <section className='guest-order-total'>
        <div>
          <h2>Totalt</h2>

          <h2>{result}</h2>
        </div>

        <p>inkl moms + drönarleverans</p>
        <button className='orderBtn' onClick={() => {sendOrder()}}>Take my money!</button>
      </section>
    </section>
     
    </section>
    </>
  )
}
