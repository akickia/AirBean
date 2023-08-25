import React, { useEffect, useState } from 'react'

export default function OrderHistory() {
const [order, setOrders] = useState()
const [msg, setMsg] = useState()

//Get order history from server if token and user ID is correct
  async function fetchProducts() {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userId")
    const userId = {
      _id: user,
    }
    const response = await fetch("https://airbeanprojectbackend.onrender.com/api/user/orderhistory", {
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
      setOrders(result)
      setMsg(data.message)
    }
  }

// Map out orders
 const ordersEl = order && order.map((item, i) => {
    return  <section key={i}><hr></hr><div><h4>Order nr {i+1}</h4><p>{item.date.slice(0, 10)}</p></div>
    <div><p>Ordersumma</p>
    <p>{item.totalPricePerOrder} kr</p></div><div><p></p><p>{item.isDelivered ? "Levererad" : "Ej levererad"}</p></div></section>
  }) 

  useEffect(() => {
    fetchProducts()
  }, [])
  

  return (
    <>
    <section className='order-history'>
      <h2>Orderhistorik</h2>
      {ordersEl ? ordersEl : <p>Inga ordrar än</p>}
    <p>{msg}</p>
    </section>
    </>
  )
}
