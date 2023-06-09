import { useEffect, useState } from "react"
import ProductCardCart from "../Components/ProductCardCart"

export default function CartGuest() {
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
    console.log(calcProducts)
    let sum = []
    calcProducts.map((item) => {
      let cost = item.price * item.no
      sum.push(cost)
    })
    console.log(sum)
    setResult(sum.reduce((acc, current) => acc + current, 0))
    console.log(result)
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

  return (
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
      <button className='orderBtn'>Take my money!</button>
    </section>
  )
}