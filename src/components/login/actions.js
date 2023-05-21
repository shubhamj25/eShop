import STORAGE_KEYS from "../../common/constants/storage_keys"
import UserRepository from "../../common/user/user_repository"
import StorageUtil from "../../common/utils/storage"

const SignInActions = {
  login: ({ username, password }) => {
    return async dispatch => {
      try {
        let response = await UserRepository.login({ username: username, password: password })
        if (response.status != 200) {
          dispatch(SignInActions.setLoginError())
        } else {
          StorageUtil.localStorage.set(STORAGE_KEYS.AUTH_TOKEN, response.data['token'])
          StorageUtil.localStorage.set(STORAGE_KEYS.USER_ID, response.data['id'])
          dispatch(SignInActions.setLoginSuccessful(response.data))
        }
      } catch (e) {
        dispatch(SignInActions.setLoginError(e))
      }
    }
  },

  setLoginError: (e) => {
    return {
      type: 'SET_LOGIN_ERROR',
      payload: 'Incorrect username or password!'
    }
  },

  setAuthToken: (payload) => {
    return {
      type: 'SET_AUTH_TOKEN',
      payload: payload
    }
  },

  setLoginSuccessful: (payload) => {
    return {
      type: 'SET_LOGIN_SUCCESSFUL',
      payload: payload
    }
  },

}

export default SignInActions