import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import CardC from '../components/CardC'
import clientAxios from '../helpers/clientAxios'
import Swal from 'sweetalert2'
import { useChangeTitlePage } from '../helpers/changeTitlePage'

const OrderPage = () => {
  useChangeTitlePage('order')
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await clientAxios.get('/orders')
      setOrders(res.data.allOrders)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al obtener las ordenes",
      });
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <Container>
      <Row sm='12' md='6' lg='4'>
        {
          orders.length
            ?
            orders.map((order, i) =>
              <CardC key={order._id} idPage='orders' idProduct={order._id} image='https://i.pinimg.com/originals/e9/17/5f/e9175f5225f6cb67cd2c310adf45c7da.png' title={`Pedido N°: ${i + 1}`} price={order.total} status={order.status} status_payment={order.status_payment} payment_method={order.payment_method} />
            )
            :
            <h1 className='text-center my-5 w-100'>No hay pedidos todavia</h1>
        }
      </Row>
    </Container>
  )
}

export default OrderPage
