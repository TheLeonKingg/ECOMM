import './App.css';
import Nav from './Components/navbar/Nav';
import Footer from './Components/footer/Footer';
import SignUp from './Components/signup/SignUp';
import PrivateComponent from './Components/products/PrivateComponent';
import Login from './Components/login/Login';
import AddProduct from './Components/products/AddProduct';
import ProductList from './Components/products/ProductList';
import UpdateProduct from './Components/products/UpdateProduct';
import Profile from './Components/Profile/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>Logout Component</h1>} />
            <Route path='/profile' element={<Profile />} />
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
