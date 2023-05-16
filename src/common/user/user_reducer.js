
let initialState = {
  userDetails: null,
  newRegistrationSuccessful  :null,
  error: null
}

let userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS': {
      return { ...state, userDetails: { ...state.userDetails, ...action.payload, error: null } }
    }
    case 'SET_USER_DETAILS_ERROR': {
      return { ...state, userDetails: { error: action.payload } }
    }
    case 'SET_REGISTRATION_SUCCESSFUL': {
      return { ...state, userDetails: null, newRegistrationSuccessful: true }
    }
    case 'SET_REGISTRATION_ERROR': {
      return { ...state, userDetails: null, error: action.payload }
    }
    default:
      return { ...state }
  }
}

export default userDetailsReducer
