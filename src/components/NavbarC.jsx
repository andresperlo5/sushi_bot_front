import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/NavbarC.css'
import ModalC from './ModalC';
import { useNavigate } from 'react-router-dom';

const NavbarC = () => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const rol = JSON.parse(sessionStorage.getItem('rol'))

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('idUser')

    setTimeout(() => {
      navigate('/')
    }, 1000);
  }


  return (
    <Navbar expand="lg" className='bg-nular'>
      <Container>
        <Navbar.Brand href={token && rol === 'user' ? '/user' : token && rol === 'admin' ? '/admin' : '/'}>
          <img src="https://i.pinimg.com/originals/e9/17/5f/e9175f5225f6cb67cd2c310adf45c7da.png" alt="" width={100} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href={token && rol === 'user' ? '/user' : token && rol === 'admin' ? '/admin' : '/'}>Inicio</Nav.Link>
            {
              !token &&
              <>
                <Nav.Link href="/about-us">Sobre Nosotros</Nav.Link>
                <Nav.Link href="/contact">Contacto</Nav.Link>
              </>
            }
            {
              token && rol === 'user' &&
              <>
                <Nav.Link href="/gallery">Galeria</Nav.Link>
                <Nav.Link href="/user/cart">Carrito</Nav.Link>
                <Nav.Link href="/user/orders">Pedidos</Nav.Link>
              </>
            }
            {
              token && rol === 'admin' &&
              <>
                <Nav.Link href="/admin/users">Panel Usuarios</Nav.Link>
                <Nav.Link href="/admin/orders">Panel Pedidos</Nav.Link>
                <Nav.Link href="/user">Vista Usuario</Nav.Link>
              </>
            }
          </Nav>
          {
            token
              ?
              <Nav className="ms-auto">
                <Nav.Link onClick={handleLogout}>Cerrar Sesion</Nav.Link>
              </Nav>
              :
              <Nav className="ms-auto">
                <Nav.Link><ModalC idModalPage='login' /></Nav.Link>
                <Nav.Link><ModalC idModalPage='register' /></Nav.Link>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarC
