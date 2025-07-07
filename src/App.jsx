import './App.css'
import Register from './Pages/Register';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import CustomNavbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import BookListing from './Pages/BooklistPage';
function App() {
        
  return (
    <>
        <CustomNavbar/>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/book-listing' element={<BookListing/>} />
        </Routes>
    </>
  
  )
}

export default App
