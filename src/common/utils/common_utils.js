import STORAGE_KEYS from "../constants/storage_keys"
import StorageUtil from "./storage"

export const isAuthTokenValid = () => {
    let token = StorageUtil.localStorage.get(STORAGE_KEYS.AUTH_TOKEN)  
    if (!token) return false
    return true
  }