import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import userDetailsReducer from './common/user/user_reducer'
import loginReducer from './components/login/reducer'
import homeReducer from './components/home/reducer'
import productDetailReducer from './components/product_detail/reducer'
import checkoutReducer from './components/checkout/reducer'

const reducers = combineReducers({
  userDetailsSlice: userDetailsReducer,
  loginDetailsSlice : loginReducer,
  homeDetailsSlice : homeReducer,
  productDetailSlice : productDetailReducer,
  checkoutSlice: checkoutReducer
})

/**
 *  This defines base configuration for setting up redux with react.
 *  All the middlewares are defined here and base store is created for provider.
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let middlewares = []

//for promises, since we are using axios for networking
middlewares.push(promise)

//for async operations, network calls
middlewares.push(thunk)

// apply middlewares
let middleware = applyMiddleware(...middlewares)

// create store
const store = createStore(reducers, composeEnhancers(middleware))
window.store = store

// export
export { store }
