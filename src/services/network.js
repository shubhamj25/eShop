import Axios from 'axios'
import StorageUtil from '../common/utils/storage'
import STORAGE_KEYS, { SERVER_ENDPOINT } from '../common/constants/storage_keys'


let _getAxiosInstance = ({ reloadIfUnauthorized = true }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const authToken = StorageUtil.localStorage.get(STORAGE_KEYS.AUTH_TOKEN)
  if (authToken) {
    headers['Authorization'] = "Bearer " + authToken
  }
  let axios = Axios.create({
    baseURL: SERVER_ENDPOINT,
    timeout: 30000,
    headers: headers,
    validateStatus: function (status) {
      return status >= 200 && status < 400
    },
  })

  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error && error.response && error.response.status === 401 && reloadIfUnauthorized) {
        StorageUtil.localStorage.remove(STORAGE_KEYS.AUTH_TOKEN)
        StorageUtil.localStorage.remove(STORAGE_KEYS.AUTH_TOKEN_EXPIRY_TIME)
        StorageUtil.localStorage.remove(STORAGE_KEYS.USER_ID)
        StorageUtil.sessionStorage.clear()
        window.location.reload()
      } else {
        return Promise.reject(error)
        // todo kr - form some model for error
      }
    }
  )

  return axios
}

let _makeRequest = async ({ url, type, data, reloadIfUnauthorized }) => {
  let response

  try {
    if (type === 'GET') {
      response = await _getAxiosInstance({ reloadIfUnauthorized }).get(url, { params: data })
    }

    if (type === 'POST') {
      response = await _getAxiosInstance({ reloadIfUnauthorized }).post(url, data)
    }

    if (type === 'PUT') {
      response = await _getAxiosInstance({ reloadIfUnauthorized }).put(url, data)
    }
    if (type === 'DELETE') {
      response = await _getAxiosInstance({ reloadIfUnauthorized }).delete(url, data)
    }

    return Promise.resolve(response)

  } catch (error) {
    return _handleError(error)
  }
}

let _handleError = (error, errorData) => {
  return Promise.resolve({
    error,
    errorData
  })
}

let NetworkService = {
  get: ({ url, data, reloadIfUnauthorized }) => {
    return _makeRequest({ url, type: 'GET', data, reloadIfUnauthorized })
  },
  post: ({ url, data, reloadIfUnauthorized }) => {
    return _makeRequest({ url, type: 'POST', data, reloadIfUnauthorized })
  },
  put: ({ url, data, reloadIfUnauthorized }) => {
    return _makeRequest({ url, type: 'PUT', data, reloadIfUnauthorized })
  },
  delete: ({ url, data, reloadIfUnauthorized }) => {
    return _makeRequest({ url, type: 'DELETE', data, reloadIfUnauthorized })
  },
}

export default NetworkService
