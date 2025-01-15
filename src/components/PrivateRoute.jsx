import { useNavigate } from "react-router-dom"

const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate()
  const token = JSON.parse(sessionStorage.getItem('token'))
  const roleUser = JSON.parse(sessionStorage.getItem('rol'))

  if (token) {
    if (rol === roleUser || rol.includes(roleUser)) {
      return children
    } else {
      if (roleUser === 'admin') {
        navigate('/admin')
      } else {
        navigate('/user')
      }
    }
  } else {
    location.href = '/'
  }

}

export default PrivateRoute
