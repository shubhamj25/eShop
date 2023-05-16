import HomeRepository from "../home/repository"

const ProductDetailActions = {
  getProductById: (id) => {
    return async dispatch => {
      try {
        let response = await HomeRepository.getProduct(id)
        if (response.status != 200) {
          dispatch(ProductDetailActions.setError())
        } else {
          dispatch(ProductDetailActions.setProduct(response.data))
        }
      } catch (e) {
        dispatch(ProductDetailActions.setError(e))
      }
    }
  },

  setError: (e) => {
    return {
      type: 'SET_ERROR',
      payload: e.toString()
    }
  },

  setProduct:(payload)=>{
    return {
      type: 'SET_PRODUCT',
      payload: payload
    }
  },

}

export default ProductDetailActions