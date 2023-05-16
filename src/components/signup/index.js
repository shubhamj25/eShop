import { connect } from 'react-redux'
import SignUp from './signup'
import SignupActions from './actions'

export const mapStateToProps = state => {
  return {
    userDetailsSlice: state.userDetailsSlice,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    registerUser: (user) => {
      dispatch(SignupActions.registerUser(user))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)