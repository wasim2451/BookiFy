import './App.css'
import Register from './Pages/Register';
import SignIn from './Pages/SignIn';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
        
  return (
   <Routes>
        <Route path='/' element={<h1>Welcome To Home Page !</h1>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/signin' element={<SignIn/>} />
   </Routes>
  )
}

export default App
