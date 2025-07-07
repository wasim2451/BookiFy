import './App.css'
import Register from './Pages/Register';
import SignIn from './Pages/SignIn';
import CustomNavbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
        
  return (
    <>
        <CustomNavbar/>
        <Routes>
        <Route path='/' element={<h1>Welcome To Home Page Sritama !</h1>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/signin' element={<SignIn/>} />
        </Routes>
    </>
  
  )
}

export default App
