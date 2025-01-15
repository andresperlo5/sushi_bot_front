import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import clientAxios from '../helpers/clientAxios';
import Swal from 'sweetalert2';
import '../css/FormC.css'
import { useNavigate } from 'react-router-dom';

const FormC = ({ idPage }) => {
  const navigate = useNavigate()
  const [register, setRegister] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    rpass: ''
  })
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const handleChangeRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }

  const handleChangeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const handleSubmmitRegister = async () => {
    try {
      if (register.password === register.rpass) {
        const res = await clientAxios.post('/users/register', {
          name: register.fullName,
          email: register.email,
          phone: register.phone,
          address: register.address,
          password: register.password,
        })

        if (res.status === 200) {
          Swal.fire({
            title: "Bienvenido!",
            text: "Registro exitoso!",
            icon: "success"
          });

          setRegister({
            fullName: '',
            email: '',
            phone: '',
            address: '',
            password: '',
            rpass: ''
          })

          setTimeout(() => {
            navigate('/login')
          }, 1000);

        }
      } else {


        setRegister({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          password: '',
          rpass: ''
        })

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contraseñas no coinciden",
        });
      }

    } catch (error) {

      setRegister({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        rpass: ''
      })

      if (error.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "Error al intentar registrar al usuario. Intente mas tarde",
        });
      }
    }
  }

  const handleSubmitLogin = async () => {
    try {
      const res = await clientAxios.post('/users/login', {
        email: login.email,
        password: login.password,
      })
      if (res.status === 200) {
        Swal.fire({
          title: "Inicio de sesion exitoso!",
          icon: "success"
        });

        sessionStorage.setItem('token', JSON.stringify(res.data.token))
        sessionStorage.setItem('rol', JSON.stringify(res.data.rol))
        sessionStorage.setItem('idUser', JSON.stringify(res.data.idUser))

        if (res.data.rol === 'admin') {
          setLogin({
            email: '',
            password: ''
          })
          setTimeout(() => {
            navigate('/admin')
          }, 1000);
        } else {
          setTimeout(() => {
            navigate('/user')
          }, 1000);
        }

      }

    } catch (error) {
      setLogin({
        email: '',
        password: ''
      })

      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al intentar iniciar sesion. Intente mas tarde",
      });
    }
  }


  return (
    <Form>
      {
        idPage === 'register' &&
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Apellido y Nombre</Form.Label>
          <Form.Control type="text" name='fullName' placeholder="Coloque su nombre. Por ej: Juan Perez" onChange={handleChangeRegister} />
        </Form.Group>
      }
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name='email' placeholder={idPage === 'register' ? "Coloque su email. Por ej: usuario@dominio.com" : ''} onChange={idPage === 'login' ? handleChangeLogin : handleChangeRegister} />
      </Form.Group>
      {
        idPage === 'register' &&
        <>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Celular de Contacto</Form.Label>
            <Form.Control type="number" name='phone' placeholder="Coloque su numero de celular. Por ej: 11 123 4567" onChange={handleChangeRegister} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" name='address' placeholder="Coloque su numero de celular. Por ej: 11 123 4567" onChange={handleChangeRegister} />
          </Form.Group>
        </>
      }
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name='password' placeholder={idPage === 'register' ? "Min: 8 Max: 50 caracteres" : ''} onChange={idPage === 'login' ? handleChangeLogin : handleChangeRegister} />
      </Form.Group>
      {
        idPage === 'register' &&
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control type="password" name='rpass' placeholder="Min: 8 Max: 50 caracteres" onChange={handleChangeRegister} />
        </Form.Group>
      }
      <div className='d-flex justify-content-center'>
        <button className='btn-nular' type="submit" onClick={idPage === 'login' ? handleSubmitLogin : handleSubmmitRegister}>
          {idPage === 'login' ? 'Ingresar' : 'Enviar Datos'}
        </button>
      </div>
    </Form>
  );
}

export default FormC;
