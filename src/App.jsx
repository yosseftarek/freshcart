import React, { useContext, useEffect } from 'react'
import Products from './Component/Products/Products'
import Register from './Component/Register/Register'
import Cart from './Component/Cart/Cart'
import Login from './Component/Login/Login'
import Brands from './Component/Brands/Brands'
import Layout from './Component/Layout/Layout'
import Categories from './Component/Categories/Categories'
import Home from './Component/Home/Home'
import NotFound from './Component/NotFound/NotFound'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import UserContextProvider, { UserContext } from './Contexts/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import WishList from './Component/WishList/WishList'
import ShippingAdress from './Component/ShippingAdress/ShippingAdress'
import AllOrders from './Component/AllOrders/AllOrders'
import ForgetPass from './Component/ForgetPass/ForgetPass'

export default function App() {
  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: `shippingadress/:cartId`, element: <ProtectedRoute><ShippingAdress /></ProtectedRoute> },
        { path: `allorders`, element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetpass', element: <ForgetPass /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [])

  return <>
    <Provider store={store}>
      <RouterProvider router={routers}></RouterProvider>
    </Provider>
    <Toaster />

  </>
}
