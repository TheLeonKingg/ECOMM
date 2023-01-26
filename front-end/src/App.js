import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './Components/navbar/Nav';
import Footer from './Components/footer/Footer';
import SignUp from './Components/signup/SignUp';
import PrivateComponent from './Components/products/PrivateComponent';
import Login from './Components/login/Login';
import AddProduct from './Components/AddProduct/AddProduct';
import ProductList from './Components/ProductList/ProductList';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import Profile from './Components/Profile/Profile';
import Cart from './Components/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>Logout Component</h1>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
