import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import clientAxios from '../helpers/clientAxios';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useChangeTitlePage } from '../helpers/changeTitlePage';

const AdminUsersPage = () => {
  useChangeTitlePage('adminUsers')
  const [users, setUsers] = useState([])
  const idUser = JSON.parse(sessionStorage.getItem('idUser'))

  const getUsers = async () => {
    try {
      const res = await clientAxios.get('/users')
      setUsers(res.data.allUsers)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Error al obtener los usuarios",
      });
    }
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <Container className='mt-5'>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Direccion</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, i) =>
              user._id !== idUser &&
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.rol}</td>
              </tr>
            )
          }

        </tbody>
      </Table>
    </Container>
  )
}

export default AdminUsersPage
