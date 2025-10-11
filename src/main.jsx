import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CryptoContextProvider from './context/CryptoContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </BrowserRouter>
)
