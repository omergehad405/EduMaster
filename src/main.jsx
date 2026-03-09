import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Provider from './context/provider.jsx'
import RootLayout from './utils/RootLayout.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/EduMaster/">
    <StrictMode>
      <Provider >
        <RootLayout>
          <App />
        </RootLayout>
      </Provider>
    </StrictMode>
  </BrowserRouter>
)
