import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element ={<ProductList/>}/>
        <Route path='/add' element ={<AddProduct/>}/>
        <Route path='/update' element ={<h1>Update Component</h1>}/>
        <Route path='/logout' element ={<h1>Logout Component</h1>}/>
        <Route path='/profile' element ={<h1>Profile Component</h1>}/>
        </Route>
        <Route path ='/login' element = {<Login/>} />
        <Route path ='/signup' element = {<SignUp/>} />
      </Routes>
      </BrowserRouter>
     <Footer/>
    </div>
  );
}

export default App;
