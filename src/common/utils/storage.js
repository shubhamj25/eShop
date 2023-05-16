import STORAGE_KEYS from "../constants/storage_keys"

const _getLocalStorageMethods = () => {
  try {
    if (window.localStorage) {
      return {
        get: key => {
          let val
          try {
            val = JSON.parse(window.localStorage.getItem(key))
          } catch (e) {
            console.log('Error in parsing JSON. Tried to parse:', key)
          }
          return val
        },
        remove: key => {
          return window.localStorage.removeItem(key)
        },
        set: (key, data) => {
          return window.localStorage.setItem(key, JSON.stringify(data))
        },
        clear: () => {
          return Object.keys(STORAGE_KEYS).forEach((k) => {
            window.localStorage.removeItem(STORAGE_KEYS[k])
          })
        }
      }
    }
  } catch (e) {
    console.log(e)
    return {}
  }
}
  
const StorageUtil = {
  localStorage: _getLocalStorageMethods(),
}
  
export default StorageUtil
  