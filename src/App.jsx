import './App.css'
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { useFirebase } from './context/FirebaseContext';
function App() {
    const {name}=useFirebase();
  return (
   <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/login' element={<h1>LogIn</h1>} />
   </Routes>
  )
}

export default App
