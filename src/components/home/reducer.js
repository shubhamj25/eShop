let initialState = {
  products: [],
  error: null,
  categories: []
}

let homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_PRODUCTS': {
      return {
        ...state,
        products: action.payload
      }
    }

    case 'SET_CATEGORIES': {
      return {
        ...state,
        categories : action.payload
      }
    }

    case 'CLEAR_PRODUCTS': {
      return {
        ...state,
        products : null
      }
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error : action.payload
      }
    }

    default:
      return state
  }
}


export default homeReducer