import HomeRepository from "./repository"

const HomeActions = {
  getProducts: () => {
    return async dispatch => {
      try {
        let response = await HomeRepository.getProducts()
        if (response.status != 200) {
          dispatch(HomeActions.setError())
        } else {
          dispatch(HomeActions.setProducts(response.data))
        }
      } catch (e) {
        dispatch(SignInActions.setError(e))
      }
    }
  },

  deleteProduct: (productId) => {
    return async dispatch => {
      try {
        let response = await HomeRepository.deleteProduct(productId)
        if (response.status != 204) {
          dispatch(HomeActions.setError())
        } else {
          dispatch(HomeActions.getProducts())
        }
      } catch (e) {
        dispatch(HomeActions.setError(e))
      }
    }
  },

  addProduct: (product) => {
    return async dispatch => {
      try {
        let response = await HomeRepository.createProduct(product)
        if (response.status != 201) {
          dispatch(HomeActions.setError())
        } else {
          dispatch(HomeActions.clearProducts())
        }
      } catch (e) {
        dispatch(HomeActions.setError(e))
      }
    }
  },

  updateProduct: (product) => {
    return async dispatch => {
      try {
        let response = await HomeRepository.updateProduct(product)
        if (response.status != 201) {
          dispatch(HomeActions.setError())
        } else {
          dispatch(HomeActions.clearProducts())
        }
      } catch (e) {
        dispatch(HomeActions.setError(e))
      }
    }
  },

  getCategories: () => {
    return async dispatch => {
      try {
        let response = await HomeRepository.getCategories()
        if (response.status != 200) {
          dispatch(HomeActions.setError())
        } else {
          dispatch(HomeActions.setCategories(response.data))
        }
      } catch (e) {
        dispatch(SignInActions.setError(e))
      }
    }
  },

  setError: (e) => {
    return {
      type: 'SET_ERROR',
      payload: e.toString()
    }
  },

  setProducts: (payload) => {
    return {
      type: 'SET_PRODUCTS',
      payload: payload
    }
  },

  filterProducts: (filters) => {
    return {
      type: 'FILTER_PRODUCTS',
      payload: filters
    }
  },

  clearProducts: () => {
    return {
      type: 'CLEAR_PRODUCTS',
    }
  },

  setCategories: (payload) => {
    return {
      type: 'SET_CATEGORIES',
      payload: payload
    }
  },

}

export default HomeActions