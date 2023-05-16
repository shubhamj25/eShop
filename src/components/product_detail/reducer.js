let initialState = {
  product: null
}

let productDetailReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_PRODUCT': {
      return {
        ...state,
        product: action.payload
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


export default productDetailReducer