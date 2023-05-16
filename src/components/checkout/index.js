import { connect } from 'react-redux'
import Checkout from './checkout'
import CheckoutActions from './actions'

export const mapStateToProps = state => {
  return {
    checkoutSlice:state.checkoutSlice
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getAddresses: () => {
      dispatch(CheckoutActions.getAddresses())
    },
    addAddress: (address) => {
      dispatch(CheckoutActions.addAddress(address))
    },
    setProduct:(id)=>{
      dispatch(CheckoutActions.getProductById(id))
    },
    setProductQuantity:(qty)=>{
      dispatch(CheckoutActions.setProductQuantity(qty))
    },
    getProductById: (id) => {
      dispatch(CheckoutActions.getProductById(id))
    },
    placeOrder :(order)=>{
      dispatch(CheckoutActions.placeOrder(order))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)