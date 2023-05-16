import { API_ENDPOINTS } from '../../common/constants/api_endpoints'
import NetworkService from '../../services/network'
import { SERVER_ENDPOINT } from '../constants/storage_keys'

const UserRepository = {
  getUserDetails: async (userId) => {
    let response = await NetworkService.get({
      url : SERVER_ENDPOINT + API_ENDPOINTS.GET_USER_DATA + userId,
    })
    return response
  },

  registerUser: async (user) => {
    let response = NetworkService.post({
      url: SERVER_ENDPOINT + API_ENDPOINTS.SIGNUP,
      data: {
        ...user,
        role: ["USER"]
      }
    })
    return response;
  },

  login: async ({ username, password }) => {
    let response = await NetworkService.post({
      url: SERVER_ENDPOINT + API_ENDPOINTS.SIGNIN,
      data: {
        username: username,
        password: password
      }
    })
    return response
  },
}

export default UserRepository