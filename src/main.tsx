import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Headers from './Component/Header/Headers.tsx'
import { BrowserRouter } from 'react-router-dom'
import store from './state/store.ts'
import { Provider } from 'react-redux'
import i18n from './i18n.ts'

i18n.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Headers />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
