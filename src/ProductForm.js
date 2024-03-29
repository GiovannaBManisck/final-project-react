import { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from './ProductContext'

function ProductForm() {
    let params = useParams()
  let [ product, setProduct ] = useState({
    id: params.productId,
    productName: "",
    description: "",
    dairyFree: "",
    price: "",
    image: "",
  })

  let { getProduct, addProduct, updateProduct } = useContext(ProductContext)
  let navigate = useNavigate()
  let { id, productName, description, driFit, price, image } = product

  useEffect(() => {
    if (id === undefined) return
    async function fetch() {
      await getProduct(id)
        .then((product) => setProduct(product))
    }
    fetch()
  }, [id])

  function handleChange(event) {
    setProduct((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value }})
  }

  function addOrUpdate() {
    if (id === undefined) {
      return addProduct(product)
    } else {
      return updateProduct(product)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    addOrUpdate().then((product) =>
      navigate(`/products`)
    )
  }

//   const filterItems = (key) => {
//     setOrderOfProducts
//   }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Product</Form.Label>
        <Form.Control type="text" name="productName" value={productName} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={description} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Is this item driFit?</Form.Label>
        <Form.Control type="text" name="driFit" value={driFit} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" name="price" value={price} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" name="image" value={image} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  )
}

export default ProductForm