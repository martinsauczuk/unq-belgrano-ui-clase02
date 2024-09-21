import { createRoot } from 'react-dom/client'
import { App } from './App';
import { triggerMessageReception } from './APIs';
import { ModelContextProvider } from './Contexts';

createRoot(document.getElementById('root')!).render(
  <ModelContextProvider>
    <App />
  </ModelContextProvider>
)

triggerMessageReception();