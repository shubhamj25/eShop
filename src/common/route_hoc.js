import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { isAuthTokenValid } from '../common/utils/common_utils'
import SignInActions from '../components/login/actions'
import StorageUtil from './utils/storage'
import STORAGE_KEYS from './constants/storage_keys'
import { useNavigate } from 'react-router'
import { ROUTES } from './constants/routes'


const RouteHoc = ({ childComponent, setAuthToken, loginDetailsSlice }) => {

  let { token, id } = loginDetailsSlice || {}
  const [isAuthorized, setAuthorized] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthTokenValid() || (token && id)) {
      setAuthToken({ token: token ?? StorageUtil.localStorage.get(STORAGE_KEYS.AUTH_TOKEN), id: id ?? StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID) })
      setAuthorized(true)
    }
    else {
      setAuthorized(false)
      navigate(ROUTES.SIGNIN)
    }
  }, [])

  return isAuthorized ? childComponent : <h1>Loading....</h1>

}

const mapStateToProps = state => {
  return {
    loginDetailsSlice: state.loginDetailsSlice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuthToken: payload => {
      dispatch(SignInActions.setAuthToken(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteHoc)