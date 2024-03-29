import { useEffect, useState } from "react"
import ProductCard from "../Components/ProductCard"
import menuBtn from "../assets/menu.jpg"
import cartBtn from "../assets/cart.svg"
import { useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"



export default function Menu() {
  const navigate = useNavigate()
  const [menu, setMenu] = useState()
  const [showDisclamer, setShowDisclamer] = useState(true)
  const [items, setItems] = useState(localStorage.getItem("items"))
  const [noProductsInCart, setNoProductsInCart] = useState(items ? parseInt(items) : 0)

  //Set items in cart
  function itemsInCart() {
    if (noProductsInCart) {
      setNoProductsInCart(prev => prev + 1)
    } else {
      setNoProductsInCart(1)
    }
  }

  //Get menu from server
  async function fetchProducts() {
    let products = await fetch('https://airbeanprojectbackend.onrender.com/api/beans')
    products = await products.json()
    setMenu(products.beans)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem("items", noProductsInCart)
  }, [noProductsInCart])


  return (
    <>
    <header className="btns-container">
         <button className="top-btn" onClick={() => {navigate("/nav")}}><img src={menuBtn} /></button>
         <div className='disclamer'><p><b>VIKTIG INFO!</b></p>
    
    {showDisclamer ? <div><p>Detta är ett studentprojekt, ej ett riktigt företag. Använd inte dina personuppgifter! Inga ordrar skickas men info du anger kan sparas i localStorage.</p><button onClick={() => setShowDisclamer(false)}>Dölj</button></div> : <button onClick={() => setShowDisclamer(true)}>Visa</button>}
    </div>
         <button className="top-btn top-btn-right" onClick={() => {navigate("/order")}}><img src={cartBtn} /></button>{noProductsInCart ? <div className="cartNo">{noProductsInCart}</div> : ""}
      </header>
    <article className="products-container">
      
      <h1>Meny</h1>
      <section className="products">
      {menu && menu.map((product, i) => <ProductCard key={i} item={product} action={() => itemsInCart()} />)}
      </section>
    </article>
    <Footer />
    </>
  )
}
