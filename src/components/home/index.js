import { connect } from 'react-redux'
import HomeActions from './actions'
import Home from './home'
import UserActions from '../../common/user/user_actions'

export const mapStateToProps = state => {
  return {
    homeDetailsSlice: state.homeDetailsSlice,
    userDetailsSlice: state.userDetailsSlice
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(HomeActions.getProducts())
    },
    getCategories: () => {
      dispatch(HomeActions.getCategories())
    },
    getUserDetails: (id) => {
      dispatch(UserActions.getUserDetails(id))
    },
    deleteProduct: (id) => {
      dispatch(HomeActions.deleteProduct(id))
    },
    filterProducts: (filters) => {
      dispatch(HomeActions.filterProducts(filters))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)