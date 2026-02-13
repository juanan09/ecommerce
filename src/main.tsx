import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initSentry } from './infrastructure/sentry'
import { AppProviders } from './providers/AppProviders'
import App from './App'
import './index.css'

initSentry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
