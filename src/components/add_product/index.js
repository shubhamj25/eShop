import { connect } from 'react-redux'
import UserActions from '../../common/user/user_actions'
import HomeActions from '../home/actions'
import ProductDetailActions from '../product_detail/actions'
import AddOrModifyProduct from './add_product'

export const mapStateToProps = state => {
  return {
    userDetailsSlice : state.userDetailsSlice,
    productDetailSlice:state.productDetailSlice,
    homeDetailsSlice : state.homeDetailsSlice
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (id) => {
      dispatch(UserActions.getUserDetails(id))
    },
    getCategories: () => {
      dispatch(HomeActions.getCategories())
    },
    getProductById:(id)=>{
      dispatch(ProductDetailActions.getProductById(id))
    },
    addProduct:(product)=>{
      dispatch(HomeActions.addProduct(product))
    },
    updateProduct:(product)=>{
      dispatch(HomeActions.updateProduct(product))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrModifyProduct)