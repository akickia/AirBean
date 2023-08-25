
import up from "../assets/arrowUp.png"
import down from "../assets/arrowDown.png"
import { useState } from "react"

export default function ProductCardCart({item, calcItems, updateCalcProduct}) {
  const [noOfItems, setNoOfItems] = useState(item.no)

  async function addToCart(item) {
    const productId = {
      id: item.id,
    }
    await fetch("https://airbeanprojectbackend.onrender.com/api/cart/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    })
    setNoOfItems(prev => prev + 1)
    updateCalcProduct(item.id, noOfItems + 1)

  }

  async function removeFromCart(item) {
    const productId = {
      id: item.id,
    }
    await fetch("https://airbeanprojectbackend.onrender.com/api/cart/remove", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    })
    setNoOfItems(prev => prev -1)
    updateCalcProduct(item.id, noOfItems -1)

  }


  return (
    <>
    {noOfItems > 0 ? 
    <section className="cartCard">
      <div>
        <h2>{item.title}</h2>
        <p>{item.price}</p>
      </div>
      <div>
        <img src={up} onClick={() => {addToCart(item)}}/>
        <p>{noOfItems}</p>
        <img src={down} onClick={() => {removeFromCart(item)}}/>
      </div> 
    </section> : ""}
    </>
  )
}
