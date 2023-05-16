import { API_ENDPOINTS } from '../../common/constants/api_endpoints'
import { SERVER_ENDPOINT } from '../../common/constants/storage_keys'
import NetworkService from '../../services/network'

const CheckoutRepository = {

    getAddresses: async () => {
        let response = await NetworkService.get({
            url: SERVER_ENDPOINT + API_ENDPOINTS.ADDRESSES,
        })
        return response
    },

    addAddress: async (address) => {
        let response = await NetworkService.post({
            url: SERVER_ENDPOINT + API_ENDPOINTS.ADDRESSES,
            data: {
                ...address
            }
        })
        return response
    },

    placeOrder: async (order) => {
        let response = await NetworkService.post({
            url: SERVER_ENDPOINT + API_ENDPOINTS.ORDERS,
            data: {
                ...order
            }
        })
        return response
    }

}

export default CheckoutRepository