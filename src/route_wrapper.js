import React, { Component } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './common/constants/routes'
import SignIn from './components/login/index'
import SignUp from './components/signup/index'
import Home from './components/home/index'
import RouteHoc from './common/route_hoc'
import ProductDetail from './components/product_detail/product_detail'
import Checkout from './components/checkout/index'
import AddOrModifyProduct from './components/add_product/index'


class RouteWrapper extends Component {
  render() {
    return (
      <Routes>
        <Route
          exact
          path={ROUTES.SIGNIN}
          element={<SignIn />}
        />
        <Route
          exact
          path={ROUTES.SIGNUP}
          element={<SignUp />}
        />
        <Route
          exact
          path={ROUTES.HOME}
          element={<RouteHoc childComponent={<Home />} />}
        />
        <Route
          exact
          path={ROUTES.PRODUCT}
          element={<RouteHoc childComponent={<ProductDetail/>} />}
        />
        <Route
          exact
          path={ROUTES.CHECKOUT}
          element={<RouteHoc childComponent={<Checkout/>} />}
        />
         <Route
          exact
          path={ROUTES.ADD_PRODUCT}
          element={<RouteHoc childComponent={<AddOrModifyProduct/>} />}
        />
        <Route path={'*'} element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    )
  }
}

export default RouteWrapper
