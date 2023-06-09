import { useEffect, useState } from "react"
import ProductCardCart from "../Components/ProductCardCart"

export default function CartGuest() {
  const [products, setProducts] = useState([])
  const [calcProducts, setCalcProducts] = useState([])

  async function fetchProducts() {
    let productsInCart = await fetch('http://localhost:8000/api/cart/order')
    productsInCart = await productsInCart.json()
    productsInCart =productsInCart.cart
    setProducts(productsInCart)
  }

  let productsEl = calcProducts && calcProducts.map((item, i) => {
    return item && <ProductCardCart item={item} key={i} calcItems={calcItems} calcProducts={calcProducts} />
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
    productsEl = calcProducts && calcProducts.map((item, i) => {
      return item && <ProductCardCart item={item} key={i} calcItems={calcItems} calcProducts={calcProducts} />
    })
  }

useEffect(() => {
  fetchProducts()
}, [])

useEffect(() => {
  calcItems()
}, [products])

  return (
    <section className='order-view'>
      <h1>Din beställning</h1>
      <section className='cart-container'>
        {productsEl}
      </section>
      <section className='order-total'>
        <div>
          <h2>Total</h2>
          <h2></h2>
        </div>
        <p>inkl moms + drönarleverans</p>
      </section>
      <button className='orderBtn'>Take my money!</button>
    </section>
  )
}


  // function calcItems() {
  //   console.log(products)
  //   let noOfItems = 1
  //   products && products.map((item) => {
  //     console.log("Item: " + item.id)
  //     const foundItem = calcProducts.find((prod) => { prod.id === item.id})
  //     if (foundItem) {
  //       noOfItems = noOfItems + 1 
  //       console.log(noOfItems)
  //     } else {
  //     let newItem = {
  //       ...item,
  //       no: noOfItems
  //     }
  //     setCalcProducts(prev => [...prev, newItem])
  //   }
  //   })
  //     console.log(calcProducts)
  //   }
  

          // if (calcProducts.includes(item.id)) {
        //   setNoOfItems(prev => prev + 1)
        //   console.log("Items: " + noOfItems)
        // } else {
        //   let newItem = {
        //   item: item,
        //   number: noOfItems
        // }
      // setCalcProducts(prev => [...prev, newItem])
      // console.log("New Item: " + newItem)
      // console.log(calcProducts)
