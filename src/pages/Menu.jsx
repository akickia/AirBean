import { useEffect, useState } from "react"
import ProductCard from "../Components/ProductCard"
import menuBtn from "../assets/menu.jpg"
import cartBtn from "../assets/cart.jpg"
import { useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"


export default function Menu() {
  const navigate = useNavigate()
  const [menu, setMenu] = useState()
  let items = localStorage.getItem("items")
  items && JSON.parse(items)
  const [noProductsInCart, setNoProductsInCart] = useState(items ? items : 0)

  function itemsInCart() {
    if (noProductsInCart) {
      setNoProductsInCart(prev => prev + 1)
      console.log(noProductsInCart)
    } else {
      setNoProductsInCart(1)
    }
    localStorage.setItem("items", noProductsInCart +1)
  }

  async function fetchProducts() {
    let products = await fetch('http://localhost:8000/api/beans')
    products = await products.json()
    setMenu(products.beans)
  }


  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <>
    <header className="btns-container">
         <button className="top-btn" onClick={() => {navigate("/nav")}}><img src={menuBtn} /></button>
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
