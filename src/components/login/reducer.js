let initialState = {
  token: null,
  id : null,
  error: null
}

let loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_SUCCESSFUL': {
      return {
        token: action.payload.token,
        id:action.payload.id
      }
    }

    case 'SET_LOGIN_ERROR': {
      return {
        token: null,
        error: action.payload
      }
    }

    case 'SET_AUTH_TOKEN': {
      return {
        ...state,
        token: action.payload.token,
        id : action.payload.id
      }
    }

    default:
      return state
  }
}


export default loginReducer