import React from 'react'
import {LOADING_MSG} from '../constants';

const LoadingMessage = () => (
  <div style={Container}>
    <div style={LoadingText}>
      {LOADING_MSG}
    </div>
  </div>
)

const Container = {
  display: 'flex',
  justifyContent: 'center',
  borderTop: '1px solid #aaaaaa'
}

const LoadingText = {
  fontSize: '18px',
  color: '#2a582a',
  marginTop: '80px'
}

export default LoadingMessage
