
import Card from 'react-bootstrap/Card';
import '../css/CardC.css'
import clientAxios, { configHeader } from '../helpers/clientAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CardC = ({ idPage, idProduct, image, title, price, description, status, status_payment, payment_method }) => {
  const navigate = useNavigate()

  const handleClickCancelOrder = async () => {
    try {
      const res = await clientAxios.put(`/orders/state/${idProduct}`, { status: 'cancelado' }, configHeader)
      if (res.status === 200) {
        Swal.fire({
          title: "Cancelado",
          text: "Tu pedido se cancelo con exito!",
          icon: "success"
        });

        setTimeout(() => {
          navigate('/user')
        }, 1000);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al intentar cancelar el pedido",
      });
    }
  }


  return (
    <Card className='card-component-style mt-5 mx-2'>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {
            idPage === 'orders'
              ?
              `total: $${price}`
              :
              `
              $${price}`
          }
        </Card.Text>
        <Card.Text className='text-truncate'>
          {description}
        </Card.Text>
        {
          idPage === 'orders' &&
          <>
            <Card.Text className='d-flex align-items-baseline'>
              <span className={status === 'cancelado' ? 'state-circule-cancel me-1' : status === 'pendiente' ? 'state-circule-pending me-1' : ''}></span>
              Estado: {status}
            </Card.Text>
            <Card.Text className='d-flex align-items-baseline'>
              <span className='state-circule-pending me-1'></span>
              Estado Pago: {status_payment}
            </Card.Text>
            <Card.Text className='d-flex align-items-baseline'>
              <span className='pay-method-cash me-1'></span>
              Metodo Pago: {payment_method}
            </Card.Text>
          </>

        }
        <div className='text-center'>
          {
            status !== 'cancelado' &&
            < a href={idPage === 'orders' ? '#' : `/user/product/${idProduct}`} className='btn-nular' type="submit" onClick={idPage === 'orders' ? handleClickCancelOrder : undefined} >
              {
                idPage === 'orders' ? 'Cancelar' : ' Ver Mas...'
              }
            </a>
          }
          {
            idPage === 'orders' && status === 'cancelado' &&
            <>

              <h4 className='text-center border-top border-bottom py-3'>CANCELADO</h4>


            </>
          }
        </div>
      </Card.Body>
    </Card >
  )
}

export default CardC
