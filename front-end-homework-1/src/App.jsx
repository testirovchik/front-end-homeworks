import { useState } from "react"

export default function App() {

  const [products, setProducts] = useState([
    {id: 101, title: "Psychology", price: 20.9, picture:"https://m.media-amazon.com/images/I/91AiNeHUoNL._UF894,1000_QL80_.jpg"},
    {id: 102, title: "Literature", price: 19.7, picture:"https://online.pubhtml5.com/aead/scwf/files/large/1.jpg"},
    {id: 103, title: "History", price: 50.0, picture:"https://bookazine.com.hk/cdn/shop/products/68fa1af4cb73f919f620253ca990118e.jpg?v=1589010646"},
    {id: 104, title: "Business", price: 28.7, picture:"https://images.booksense.com/images/886/475/9781465475886.jpg"},
    {id: 105, title: "Poetry", price: 34.2, picture:"https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/9780241566237.jpg"},
    {id: 106, title: "Economics", price: 34.5, picture:"https://m.media-amazon.com/images/I/91RFsY--usL._UF1000,1000_QL80_.jpg"},
    {id: 107, title: "Chemistry", price: 34.7, picture:"https://storage.googleapis.com/circlesoft/document/photos/003/727/595/large_temp_img.jpg20250706-1-n0dadc?1751772039"},
    {id: 108, title: "Biology", price: 20.9, picture:"https://hivoltagerecords.com/cdn/shop/files/new-book-the-biology-book-big-ideas-simply-explained-hardcover-31004415918135.jpg?v=1720471813"}
  ])

  const [basket, setBasket] = useState([])

  const moveToCart = product => {
    const found = basket.find(item =>item.id == product.id)
    if(!found){
      setBasket([...basket, {...product,quantity: 1}])
    }
    else {
      found.quantity++
      setBasket([...basket])
    }
  }

  const adding = product => {
    product.quantity++
    setBasket([...basket]);
  }

  const substracting = product => {
    if(product.quantity > 1) {
      product.quantity--;
      setBasket([...basket]);
    }
  }

  const delFromBasket = product => {
    setBasket(
      basket.filter(item => item.id != product.id)
    )
  }

  const sorting = hint => {
    if(hint == "price") {
      setBasket([...basket].sort((a,b) => a.price - b.price)) 
    }
    if(hint == "subtotal") {
      setBasket([...basket].sort((a,b) => (a.quantity * a.price)- (b.quantity * b.price)))
    }
    if(hint == "quantity") {
      setBasket([...basket].sort((a,b) => a.quantity - b.quantity))
    }
    if(hint == "product") {
      setBasket([...basket].sort((a,b) => a.title.localeCompare(b.title)));
    }
  }

  return <div  className="container">
    <h1 className="display-3">Shopping card</h1>
    <div className="row">
      
      <div className="col-md-8">
        <h2>Products</h2>
        <div className="row">
          {
            products.map(product => <div key = {product.id} className="col-md-3 my-2">
              <img 
                src={product.picture}
                style={{width: 150, height: 150}}
              />

              <p>{product.title}</p>
              <p className="text-danger">{product.price}USD</p>
              <button onClick={() => moveToCart(product)} className="btn btn-outline-danger">+</button>
            </div>)
          }
        </div>
      </div>

      <div className="col-md-4">
        <h2>Basket</h2>
        <table className="table table-dark table-bordered table-striped">

          <thead>
            <tr>
              <th className="clickable" onClick={() => sorting("product")}>product</th>
              <th className="clickable" onClick={() => sorting("price")}>price</th>
              <th className="clickable" onClick={() => sorting("quantity")}>quantity</th>
              <th className="clickable" onClick={() => sorting("subtotal")}>subtotal</th>
              <th className="clickable">actions</th>
            </tr>
          </thead>

          <tbody>
            {
              basket.map(item =>{ 
                return <tr key = {item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}USD</td>
                  <td>{item.quantity}</td>
                  <td>{(item.quantity * item.price).toFixed(1)}USD</td>
                  <td>
                    <table onClick={() => adding(item)} className="btn btn-outline-success btn-sm">+</table>
                    <table disable = {true} onClick={() => substracting(item)} className="btn btn-outline-warning btn-sm ">-</table>
                    <table onClick={() => delFromBasket(item)} className="btn btn-outline-danger btn-sm">x</table>
                  </td>
                </tr>
              })
            }
          </tbody>

        </table>
      </div>

    </div>
  </div>
}