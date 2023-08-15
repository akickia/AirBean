import React, { useEffect, useState } from 'react'

export default function OrderHistory() {
const [order, setOrders] = useState()
  async function fetchProducts() {
    
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userId")
    const userId = {
      _id: user,
    }
    const response = await fetch("http://localhost:8000/api/user/orderhistory", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(userId)
    })
    const data = await response.json();
    const result = await data.orders
    if (data.success) {
      console.log(result)
      setOrders(result)
      console.log(order)
    } else {
      console.log(data)
    }
  }

  function timeOfDelivery(date) {
    const time = date.slice(11, 16)
    return time
  }

  //Convert to time - how? 

 const ordersEl = order && order.map((item, i) => {
    return  <section key={i}><hr></hr><div><h4>Order nr {i+1}</h4><p>{item.date.slice(0, 10)}</p></div>
    <div><p>Total ordersumma</p>
    <p>{item.totalPricePerOrder} kr</p></div><div><p></p><p>{item.isDelivered ? "Levererad" : "Ej levererad"}</p></div></section>
    // item.map((prod) => {
    //   <p>prod.title</p>
    // })
  }) 
  useEffect(() => {
    fetchProducts()
  }, [])
  

  return (
    <>
    <section className='order-history'>
      <h2>Orderhistorik</h2>

      {ordersEl}
    </section>
    </>
  )
}
