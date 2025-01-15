export const useChangeTitlePage = (idPage) => {
  switch (idPage) {
    case 'home':
      document.title = 'Pagina Principal'
      break
    case 'user':
      document.title = 'Usuario: Pagina Principal'
      break
    case 'productDetail':
      document.title = 'Producto: Detalle ...'
      break
    case 'cart':
      document.title = 'Carrito Usuario'
      break
    case 'order':
      document.title = 'Pedidos Usuario'
      break
    case 'admin':
      document.title = 'Administrador: Pagina Principal'
      break
    case 'adminUsers':
      document.title = 'Administrador: Panel Usuarios'
      break

    case 'adminOrders':
      document.title = 'Administrador: Panel Pedidos'
      break



    default:
      document.title = 'ERROR'
      break
  }
}
