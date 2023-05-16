import UserRepository from "../../common/user/user_repository"

const SignupActions = {
  registerUser: (user) => {
    return async dispatch => {
      try {
        let response = await UserRepository.registerUser(user)
        if (response.status != 200) {
          dispatch(SignupActions.setRegistrationError())
        } else {
          dispatch(SignupActions.setRegistrationSuccessful())
        }
      } catch (e) {
        dispatch(SignupActions.setRegistrationError(e))
      }
    }
  },

  setRegistrationError: () => {
    return {
      type: 'SET_REGISTRATION_ERROR',
      payload: "Something went wrong, unable to register :("
    }
  },

  setRegistrationSuccessful: () => {
    return {
      type: 'SET_REGISTRATION_SUCCESSFUL',
      payload: "Registration successful :)"
    }
  },

}

export default SignupActions