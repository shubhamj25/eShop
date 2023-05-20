let initialState = {
  products: [],
  error: null,
  totalProducts: [],
  categories: []
}

function compareDesc(p1, p2) {
  if (p1.price < p2.price) {
    return -1;
  }
  if (p1.price > p2.price) {
    return 1;
  }
  return 0;
}

function compareAsc(p1, p2) {
  if (p1.price > p2.price) {
    return -1;
  }
  if (p1.price < p2.price) {
    return 1;
  }
  return 0;
}

let homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_PRODUCTS': {
      return {
        ...state,
        products: action.payload,
        totalProducts: action.payload
      }
    }

    case 'SET_CATEGORIES': {
      return {
        ...state,
        categories: action.payload
      }
    }

    case 'CLEAR_PRODUCTS': {
      return {
        ...state,
        products: null
      }
    }

    case 'FILTER_PRODUCTS': {
      let { keyword = '',
        value = 0
      } = action.payload || {}
      state.products = state.totalProducts
      if (state.products && value >= 0) {
        state.products.sort(value == 0 ? compareAsc : compareDesc)
      }
      return {
        ...state,
        products: state.products.filter(p => p.name.toString().toLowerCase().trim().includes(keyword.toLowerCase().trim())),
      }
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload
      }
    }

    default:
      return state
  }
}


export default homeReducer