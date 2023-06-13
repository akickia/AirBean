import { useEffect, useState } from "react"
import ProductCardCart from "../Components/ProductCardCart"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header"


export default function Cart() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [calcProducts, setCalcProducts] = useState([])
  const [result, setResult] = useState()
  

  async function fetchProducts() {
    let productsInCart = await fetch('http://localhost:8000/api/cart/order')
    productsInCart = await productsInCart.json()
    productsInCart =productsInCart.cart
    setProducts(productsInCart)
  }

  let productsEl = calcProducts && calcProducts.map((item, i) => {
    return item && <ProductCardCart item={item} key={i} calcItems={calcItems} updateCalcProduct={updateCalcProduct} calcProducts={calcProducts} />
  })

  
  function calcItems() {
    const updatedCalcProducts = products && products.reduce((acc, item) => {
      const foundItem = acc.find((prod) => prod.id === item.id);
      if (foundItem) {
        foundItem.no += 1;
      } else {
        acc.push({ ...item, no: 1 });
      }
      return acc;
    }, []);
    setCalcProducts(updatedCalcProducts);
  }

  function updateCalcProduct(itemId, newNo) {
    const updatedCalcProducts = calcProducts.map((item) => {
      if (item.id === itemId) {
        return { ...item, no: newNo };
      }
      return item;
    });
    setCalcProducts(updatedCalcProducts);
  }

  function calculateSum() {
    let sum = []
    calcProducts.map((item) => {
      let cost = item.price * item.no
      sum.push(cost)
    })
    setResult(sum.reduce((acc, current) => acc + current, 0))
  }

useEffect(() => {
  fetchProducts()
}, [])

useEffect(() => {
  calcItems()
}, [products])

useEffect(() => {
  calculateSum()
}, [calcProducts])

async function checkLoggedIn() {
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("userId")
  const userId = {
    _id: user,
  }
  const response = await fetch("http://localhost:8000/api/cart/sendorder", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(userId)
  })
  const data = await response.json();
  if (data.success) {
    localStorage.setItem("items", "")
    let message = data.message
    localStorage.setItem("message", message)
    navigate("/order/confirmation")
  } else {
    navigate("/login")
    localStorage.setItem("products", JSON.stringify(calcProducts))
    localStorage.setItem("total", result)
  }
}

function handleBtn() {
  checkLoggedIn()
}

  return (
    <>
      <Header />
    <section className='order-view'>
      <h1>Din beställning</h1>
      <section className='cart-container'>
        {productsEl}
      </section>
      <section className='order-total'>
        <div>
          <h2>Total</h2>
          <h2>{result}</h2>
        </div>
        <p>inkl moms + drönarleverans</p>
      </section>
      <button className='orderBtn' onClick={() => {handleBtn()}}>Take my money!</button>
    </section>
    </>
  )
}