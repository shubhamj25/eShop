import STORAGE_KEYS from "../../common/constants/storage_keys"
import StorageUtil from "../../common/utils/storage"

let initialState = {
  addresses: null,
  error: null,
  product: null,
  orderPlacedSuccessfully: null,
  quantity: null
}

let checkoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_ADDRESSES': {
      return {
        ...state,
        addresses: [...action.payload].filter(a => a.user == StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID)),
        orderPlacedSuccessfully: null
      }
    }

    case 'ADD_ADDRESS': {
      return {
        ...state,
        addresses: [...state.addresses, action.payload].filter(a => a.user == StorageUtil.localStorage.get(STORAGE_KEYS.USER_ID)),
        orderPlacedSuccessfully: null
      }
    }

    case 'SET_PRODUCT': {
      return {
        ...state,
        product: action.payload,
        orderPlacedSuccessfully: null
      }
    }


    case 'SET_PRODUCT_QUANTITY': {
      return {
        ...state,
        quantity: action.payload,
        orderPlacedSuccessfully: null
      }
    }

    case 'ORDER_PLACED': {
      return {
        ...state,
        orderPlacedSuccessfully: action.payload
      }
    }


    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
        orderPlacedSuccessfully: null
      }
    }

    default:
      return state
  }
}


export default checkoutReducer