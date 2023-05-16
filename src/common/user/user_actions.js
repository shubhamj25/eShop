import UserRepository from './user_repository.js'

const UserActions = {
  getUserDetails: (userId) => {
    return async dispatch => {
      try {
        let response = await UserRepository.getUserDetails(userId)
        if (response.status!=200) {
          dispatch(UserActions.setUserDetailsError("Unable to fetch user details!"))
        } else {
          dispatch(UserActions.setUserDetails(response.data))
        }
      } catch (e) {
        dispatch(UserActions.setUserDetailsError(e))
      }
    }
  },

  setUserDetails: (userDetails) => {
    return {
      type: 'SET_USER_DETAILS',
      payload: userDetails
    }
  },

  setUserDetailsError: (error) => {
    return {
      type: 'SET_USER_DETAILS_ERROR',
      payload: error.toString()
    }
  },

  clearUserDetails: () => {
    return {
      type: 'CLEAR_USER_DETAILS'
    }
  },
}

export default UserActions