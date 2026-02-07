// App bootstrap: mount React into the DOM.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Create the root React container and render the app.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
