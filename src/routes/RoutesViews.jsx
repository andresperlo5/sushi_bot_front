import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import AdminPage from '../pages/AdminPage'
import UserPage from '../pages/UserPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import OrderPage from '../pages/OrderPage'
import AdminUsersPage from '../pages/AdminUsersPage'
import AdminOrdersPage from '../pages/AdminOrdersPage'
import PrivateRoute from '../components/PrivateRoute'

const RoutesViews = () => {
  return (
    <Routes>
      <Route path='/admin/orders' element={
        <PrivateRoute rol={'admin'}>
          <AdminOrdersPage />
        </PrivateRoute>
      } />
      <Route path='/admin/users' element={
        <PrivateRoute rol={'admin'}>
          <AdminUsersPage />
        </PrivateRoute>
      } />
      <Route path='/admin' element={
        <PrivateRoute rol={'admin'}>
          <AdminPage />
        </PrivateRoute>
      } />
      <Route path='/user/orders' element={
        <PrivateRoute rol={'user'}>
          <OrderPage />
        </PrivateRoute>
      } />
      <Route path='/user/product/:idProduct' element={
        <PrivateRoute rol={'user'}>
          <ProductPage />
        </PrivateRoute>
      } />
      <Route path='/user/cart' element={
        <PrivateRoute rol={'user'}>
          <CartPage />
        </PrivateRoute>
      } />
      <Route path='/user' element={
        <PrivateRoute rol={['user', 'admin']}>
          <UserPage />
        </PrivateRoute>
      } />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default RoutesViews
