import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { ProvideAuth } from './hooks/useAuth'

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
)
