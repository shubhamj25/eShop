import React, { useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import './index.scss'

export const SnackbarTypes = {
  error: 'error',
  success: 'success',
  info: 'info'
}

const Snackbar = ({
  type = SnackbarTypes.success,
  duration = 5000,
  children,
  hideSnackbar,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      hideSnackbar()
    }, duration)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="snackbar-container">
      <div className={`snackbar ${type}`}>
        {type === SnackbarTypes.success ? <CheckCircleIcon /> : <ErrorIcon />}
        {children}
      </div>
    </div>
  )
}

export default Snackbar
