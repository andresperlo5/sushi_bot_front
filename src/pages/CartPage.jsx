import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import clientAxios from '../helpers/clientAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useChangeTitlePage } from '../helpers/changeTitlePage';

const CartPage = () => {
  useChangeTitlePage('cart')
  const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const getCart = async () => {
    try {
      const res = await clientAxios.get('/carts');
      setCart(res.data.cart);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al obtener el carrito",
      });
    }
  };

  const handleClickUpdateQuantityMenu = (idProduct) => {
    setEditingProductId(idProduct);
  };

  const handleSaveQuantity = async (idProduct, newQuantity) => {
    try {
      await clientAxios.put(
        `/carts/quantity/${idProduct}`,
        { quantity: newQuantity }
      );

      setCart((prevCart) =>
        prevCart.map((product) =>
          product._id === idProduct
            ? { ...product, quantity: newQuantity }
            : product
        )
      );

      setEditingProductId(null);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al cambiar la cantidad",
      });
    }
  };

  const handleClickCancelEdit = () => {
    setEditingProductId(null)
    getCart()
  }

  let addTotalPay = 0

  const totalPay = (price, quantity) => {
    addTotalPay += price * quantity
    return price * quantity
  }


  const handleDeleteProductCart = async (idProduct) => {
    try {

      Swal.fire({
        title: "Estas seguro de que quieres eliminar este producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clientAxios.delete(`/carts/${idProduct}`)
          getCart()

          Swal.fire({
            title: "Producto eliminado con exito!",
            icon: "success"
          });
        }
      });

    } catch (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "Error al borrar el producto. Intente mas tarde",
        });
      }
    }
  }

  const handleConfirmOrder = async () => {
    try {
      const newCartItemsBack = []
      cart.forEach((itemMenu) => {
        const { _id, quantity } = itemMenu
        const obj = {
          menuItem: _id,
          quantity
        }
        newCartItemsBack.push(obj)
      })
      const res = await clientAxios.post('/orders', { cart: newCartItemsBack })

      if (res.status === 200) {
        const res = await clientAxios.delete(`/carts/alls/products`)

        if (res.status === 200) {
          Swal.fire({
            title: "Gracias por su compra!",
            text: "En breve se comenzara con la preparacion de su pedido!",
            icon: "success"
          });

          setTimeout(() => {
            navigate('/user/orders')
          }, 2000);
        }
      }
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear el pedido. Intente mas tarde",
        });
      }
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Container className="text-center py-5" style={{ minHeight: '60vh' }}>
      {
        cart.length
          ?
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((productMenu, i) => (
                  <tr key={productMenu._id}>
                    <td>{i + 1}</td>
                    <td>{productMenu.name}</td>
                    <td>${productMenu.price}</td>
                    <td>
                      {editingProductId === productMenu._id ? (
                        <>
                          <input
                            type="number"
                            defaultValue={productMenu.quantity}
                            onChange={(e) =>
                              setCart((prevCart) =>
                                prevCart.map((product) =>
                                  product._id === productMenu._id
                                    ? { ...product, quantity: e.target.value }
                                    : product
                                )
                              )
                            }
                          />
                          <button
                            className="mx-2 btn btn-success"
                            onClick={() =>
                              handleSaveQuantity(
                                productMenu._id,
                                productMenu.quantity
                              )
                            }
                          >
                            Guardar
                          </button>
                          <button
                            className="mx-2 btn btn-danger"
                            onClick={() => handleClickCancelEdit(productMenu._id)}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <p>{productMenu.quantity}</p>
                      )}
                    </td>
                    <td>
                      <p>${totalPay(productMenu.price, productMenu.quantity)}</p>
                    </td>
                    <td>
                      <button
                        className="mx-2 btn btn-success"
                        onClick={() => handleClickUpdateQuantityMenu(productMenu._id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="mx-2 btn btn-danger" onClick={() => handleDeleteProductCart(productMenu._id)}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>Total a pagar: {addTotalPay}</p>
            <Button onClick={handleConfirmOrder}>Confirmar Pedido</Button>
          </>
          :
          <h2>No hay nada en el carrito todavia</h2>
      }

    </Container>
  );
};

export default CartPage;
