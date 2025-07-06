import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Firebase } from './context/FirebaseContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Firebase>
         <App />
    </Firebase>
  </BrowserRouter>
)
