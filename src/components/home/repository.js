import { API_ENDPOINTS } from '../../common/constants/api_endpoints'
import { SERVER_ENDPOINT } from '../../common/constants/storage_keys'
import NetworkService from '../../services/network'

const HomeRepository = {

    getProducts: async () => {
        let response = await NetworkService.get({
            url: SERVER_ENDPOINT + API_ENDPOINTS.PRODUCTS,
        })
        return response
    },

    getProduct: async (id) => {
        let response = await NetworkService.get({
            url: SERVER_ENDPOINT + API_ENDPOINTS.PRODUCTS + "/" + id,
        })
        return response
    },

    getCategories: async () => {
        let response = await NetworkService.get({
            url: SERVER_ENDPOINT + API_ENDPOINTS.CATEGORIES,
        })
        return response
    },

    createProduct: async (product) => {
        let response = await NetworkService.post({
            url: SERVER_ENDPOINT + API_ENDPOINTS.CREATE_PRODUCT,
            data:{
                ...product
            }
        })
        return response
    },

    deleteProduct: async (id) => {
        let response = await NetworkService.delete({
            url: SERVER_ENDPOINT + API_ENDPOINTS.PRODUCTS + "/" + id,
        })
        return response
    },


    updateProduct: async (product) => {
        let response = await NetworkService.put({
            url: SERVER_ENDPOINT + API_ENDPOINTS.PRODUCTS + "/" + product.id,
            data:{
                ...product
            }
        })
        return response
    },

}

export default HomeRepository