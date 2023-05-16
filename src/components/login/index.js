import { connect } from 'react-redux'
import SignIn from './login'
import SignInActions from './actions'

export const mapStateToProps = state => {
  return {
    loginDetailsSlice: state.loginDetailsSlice,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    login: ({ username, password }) => {
      dispatch(SignInActions.login({ username: username, password: password }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)