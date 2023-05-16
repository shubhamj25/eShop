import HomeRepository from "../home/repository"
import CheckoutRepository from "./repository"

const CheckoutActions = {
  getAddresses: () => {
    return async dispatch => {
      try {
        let response = await CheckoutRepository.getAddresses()
        if (response.status != 200) {
          dispatch(CheckoutActions.setError("Unable to get Addresses!"))
        } else {
          dispatch(CheckoutActions.setAddresses(response.data))
        }
      } catch (e) {
        dispatch(CheckoutActions.setError(e))
      }
    }
  },

  getProductById: (id) => {
    return async dispatch => {
      try {
        let response = await HomeRepository.getProduct(id)
        if (response.status != 200) {
          dispatch(CheckoutActions.setError("Unable to get product!"))
        } else {
          dispatch(CheckoutActions.setProduct(response.data))
        }
      } catch (e) {
        dispatch(CheckoutActions.setError(e))
      }
    }
  },

  addAddress: (address) => {
    return async dispatch => {
      try {
        let response = await CheckoutRepository.addAddress(address)
        if (response.status != 201) {
          dispatch(CheckoutActions.setError("Unable to add address!"))
        } else {
          dispatch(CheckoutActions.addedAddressSuccessfully(address))
        }
      } catch (e) {
        dispatch(CheckoutActions.setError(e))
      }
    }
  },

  placeOrder : (order)=>{
    return async dispatch => {
      try {
        let response = await CheckoutRepository.placeOrder(order)
        if (response.status != 201) {
          dispatch(CheckoutActions.setError("Unable to place order!"))
        } else {
          dispatch(CheckoutActions.orderPlaced(true))
        }
      } catch (e) {
        dispatch(CheckoutActions.setError(e))
      }
    }
  },

  setError: (e) => {
    return {
      type: 'SET_ERROR',
      payload: e.toString()
    }
  },

  setAddresses: (payload) => {
    return {
      type: 'SET_ADDRESSES',
      payload: payload
    }
  },

  setProduct: (payload) => {
    return {
      type: 'SET_PRODUCT',
      payload: payload
    }
  },

  setProductQuantity: (payload) => {
    return {
      type: 'SET_PRODUCT_QUANTITY',
      payload: payload
    }
  },

  orderPlaced: (payload) => {
    return {
      type: 'ORDER_PLACED',
      payload: payload
    }
  },

  addedAddressSuccessfully: (payload) => {
    return {
      type: 'ADD_ADDRESS',
      payload: payload
    }
  },

}

export default CheckoutActions