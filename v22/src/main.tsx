import { createRoot } from 'react-dom/client'
import { App, ModelContextProvider } from './view';

createRoot(document.getElementById('root')!).render(
  <ModelContextProvider>
    <App />
  </ModelContextProvider>
)
