import { createRoot } from 'react-dom/client'
import { triggerMessageReception } from './APIs/triggerMessageReception';
import { App } from './App';
import { ModelContextProvider } from './Contexts/ModelContext/ModelContextProvider';

createRoot(document.getElementById('root')!).render(
  <ModelContextProvider>
    <App />
  </ModelContextProvider>
)

triggerMessageReception();