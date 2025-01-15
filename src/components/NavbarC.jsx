import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/NavbarC.css'
import ModalC from './ModalC';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
        <NavLink to={token && rol === 'user' ? '/user' : token && rol === 'admin' ? '/admin' : '/'}>
          <img src="https://i.pinimg.com/originals/e9/17/5f/e9175f5225f6cb67cd2c310adf45c7da.png" alt="" width={100} />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className='nav-link' to={token && rol === 'user' ? '/user' : token && rol === 'admin' ? '/admin' : '/'}>Inicio</NavLink>
            {
              !token &&
              <>
                <NavLink className='nav-link' to="/about-us">Sobre Nosotros</NavLink>
                <NavLink className='nav-link' to="/contact">Contacto</NavLink>
              </>
            }
            {
              token && rol === 'user' &&
              <>
                <NavLink className='nav-link' to="/gallery">Galeria</NavLink>
                <NavLink className='nav-link' to="/user/cart">Carrito</NavLink>
                <NavLink className='nav-link' to="/user/orders">Pedidos</NavLink>
              </>
            }
            {
              token && rol === 'admin' &&
              <>
                <NavLink className='nav-link' to="/admin/users">Panel Usuarios</NavLink>
                <NavLink className='nav-link' to="/admin/orders">Panel Pedidos</NavLink>
                <NavLink className='nav-link' to="/user">Vista Usuario</NavLink>
              </>
            }
          </Nav>
          {
            token
              ?
              <Nav className="ms-auto">
                <NavLink className='nav-link' onClick={handleLogout}>Cerrar Sesion</NavLink>
              </Nav>
              :
              <Nav className="ms-auto">
                <NavLink className='nav-link' ><ModalC idModalPage='login' /></NavLink>
                <NavLink className='nav-link' ><ModalC idModalPage='register' /></NavLink>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarC
