import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import clientAxios, { configHeader } from "../helpers/clientAxios"
import { Col, Container, Row } from "react-bootstrap"
import Swal from "sweetalert2"

const ProductPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [productMenu, setProductMenu] = useState({})
  const [quantity, setQuantity] = useState(1)
  const rol = JSON.parse(sessionStorage.getItem('rol'))

  const getProductMenu = async () => {
    try {
      const res = await clientAxios.get(`/menus/${params.idProduct}`, configHeader)
      setProductMenu(res.data.menuItem)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al obtener el menu",
      });
    }
  }

  const handleClickCart = async () => {
    try {
      const res = await clientAxios.post(`/carts/${params.idProduct}`, {
        quantity
      }, configHeader)

      if (res.status === 200) {
        Swal.fire({
          title: "Producto cargado al carrito!",
          icon: "success"
        });
      }

      setTimeout(() => {
        navigate('/user')
      }, 1000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al cargar el producto en el carrito",
      });
    }
  }

  useEffect(() => {
    getProductMenu()
  }, [])
  return (
    <>
      <Container style={{ minHeight: '60vh' }}>
        <Row className="align-items-center justify-content-center">
          <Col className="py-5 text-end">
            <img src={productMenu.imageUrl} alt="" width={'60%'} />
          </Col>
          <Col className="py-5 text-start">
            <p>{productMenu.description}</p>
            <p>${productMenu.price}</p>
            <button className={rol === 'admin' ? 'btn-nular-disabled w-25' : 'btn-nular w-25'} onClick={handleClickCart} disabled={rol === 'admin'}>Añadir al Carrito</button>
            <input className="input-nular" type="number" value={quantity <= 1 ? 1 : quantity} onChange={(ev) => setQuantity(ev.target.value)} disabled={rol === 'admin'} />
            <div className="mt-3 w-50">*En el caso de que el plato este cargado en el carrito. La cantidad solo se podra modificar desde el carrito.</div>
          </Col>
        </Row>
      </Container >

    </>
  )
}

export default ProductPage
