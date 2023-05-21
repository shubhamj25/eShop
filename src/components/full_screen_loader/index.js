import React from 'react'
import './index.scss'
import { CircularProgress } from '@mui/material'

const FullScreenLoader = ({ children, text }) => {
  if (!text) {
    text = "Loading"
  }
  return (
    <div className='full-screen-loader'> <CircularProgress /></div>

  )
}

export default FullScreenLoader
