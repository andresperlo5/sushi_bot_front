import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import clientAxios, { configHeader } from '../helpers/clientAxios';
import { Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useChangeTitlePage } from '../helpers/changeTitlePage';

const AdminOrdersPage = () => {
  useChangeTitlePage('adminOrders')
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);

  const getOrders = async () => {
    try {
      const res = await clientAxios.get('/orders', configHeader);
      setOrders(res.data.allOrders);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al obtener las ordenes",
      });
    }
  };

  const handleClickCancelOrder = async (idOrder) => {
    try {
      Swal.fire({
        title: "Estas seguro de que quieres cancelar este pedido?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clientAxios.put(`/orders/state/${idOrder}`, { status: 'cancelado' }, configHeader);
          getOrders();
          Swal.fire({
            title: "Pedido cancelado!",
            icon: "success"
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al cancelar la orden",
      });
    }
  };

  const handleChangeStateOrder = (idOrder) => {
    setEditingOrderId(idOrder);
  };

  const handleSelectChange = async (event, idOrder) => {
    try {
      const newStatus = event.target.value;
      const res = await clientAxios.put(`/orders/state/${idOrder}`, { status: newStatus }, configHeader)
      getOrders()
      setEditingOrderId(null)
      if (res.status === 200) {
        Swal.fire({
          title: res.data.msg,
          icon: "success"
        });

      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al cambiar de opcion",
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container className='mt-5'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Estado del pedido</th>
            <th>Estado del pago</th>
            <th>Metodo Pago</th>
            <th>Total</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, i) => (
            <tr key={order._id}>
              <td>{i + 1}</td>
              <td>
                {editingOrderId === order._id ? (
                  <Form.Select
                    onChange={(e) => handleSelectChange(e, order._id)}
                  >
                    <option disabled>
                      Estado actual:  {
                        order.status === 'en_camino' ?
                          'en camino'
                          : order.status === 'en_preparacion' ?
                            'en preparacion'
                            : order.status
                      }</option>
                    <option value="pendiente">pendiente</option>
                    <option value="en_preparacion">en preparación</option>
                    <option value="en_camino">en camino</option>
                    <option value="entregado">entregado</option>
                    <option value="cancelado">cancelado</option>
                    <option value="rechazado">rechazado</option>
                  </Form.Select>
                ) : (
                  order.status === 'en_camino' ?
                    'en camino'
                    : order.status === 'en_preparacion' ?
                      'en preparacion'
                      : order.status
                )}
              </td>
              <td>{order.status_payment}</td>
              <td>{order.payment_method}</td>
              <td>${order.total}</td>
              <td>
                {order.status !== 'cancelado' && order.status !== 'rechazado' && (
                  <>
                    <Button
                      variant="warning"
                      className="mx-1"
                      onClick={() => handleChangeStateOrder(order._id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => handleClickCancelOrder(order._id)}
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrdersPage;
