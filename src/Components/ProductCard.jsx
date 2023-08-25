


export default function ProductCard({item, action}) {
  
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
    action()
  }
  return (
    <section className="card">
      <button className="top-btn top-btn-right top-btn-add" id={item.id} onClick={() => {addToCart(item)}}>+</button>
      <div>  
        <h2>{item.title}</h2>
        <p className="product-text">{item.desc}</p>
      </div>
      <h2>{item.price} kr</h2>
    </section>
  )
}
