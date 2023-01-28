import axios from 'axios';
import React from 'react';
import { useEffect, useState, } from 'react';
import { Button } from 'reactstrap';
import "./productlist.css";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { addToCart } from '../../features/cartSlice';



const ProductList = () => {
    const [myProduct, setProduct] = useState([]);
    const token = JSON.parse(localStorage.getItem('user')).auth;
    const config = { headers: { 'authorization': token }, };
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        getProduct();
    }, []);

    const getProduct = () => {
        axios.get("http://localhost:5000/getAllProducts", config,)

            .then((response) => setProduct(response.data))
    };



    const deleteProduct = (e, _id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"

        const token = JSON.parse(localStorage.getItem('user')).auth;
        const config = { headers: { 'authorization': token }, };

        axios.delete(`http://localhost:5000/delete-product/${_id}/${1}`, config,)

            .then(res => {
                window.location.reload();
            });
    };

    const searchHandle = (event) => {
        const token = JSON.parse(localStorage.getItem('user')).auth;
        const config = { headers: { 'authorization': token }, };

        let key = event.target.value;
        if (key) {
            axios.get(`http://localhost:5000/search/${key}`, config)
                .then(res => setProduct(res.data))
        } else {
            getProduct();
        }
    };
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {

        dispatch(addToCart(item));
        navigate("/cart");

    };


    return (

        <>
            <div className='product-list'>
                <h2> ProductList</h2>
                <input type="" className='search-product-box' placeholder='Search Product'
                    onChange={searchHandle} />
            </div>
            <div className='Table-Bg'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProduct.length > 0 ? myProduct.map((item, index) =>
                                <tr key={item._id} className='tbody'>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.image}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.quantity}</td>
                                    <td><Button type='button' className='btn-delete' onClick={(e) => deleteProduct(e, item._id)}>Delete</Button>
                                        <Button className='Btn-update'><Link to={"/update/" + item._id}>Update</Link></Button>
                                        <Button className='Btn-update' onClick={() => handleAddToCart(item)}>Add To Cart</Button></td>

                                </tr>
                            )

                                : <tr><td>No result found</td></tr>}
                    </tbody>
                </table>
            </div>
        </>

    )
};

export default ProductList;
