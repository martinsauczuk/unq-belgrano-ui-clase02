import { createRoot } from 'react-dom/client';
import { App, ModelContextProvider }  from './view.jsx'

createRoot(document.getElementById('root')).render(
  <ModelContextProvider>
    <App/>
  </ModelContextProvider>
)
