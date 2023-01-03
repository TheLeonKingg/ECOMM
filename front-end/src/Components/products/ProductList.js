import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import "./productlist.css";

const ProductList = () => {
    const [myData, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem('user')).auth;
    const config = { headers: { 'authorization': token }, };

    useEffect(() => {
        axios.get("http://localhost:5000/getAllProducts", config,)

            .then((response) => setData(response.data))

    }, []);


    const deleteProduct = (e, _id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"

        const token = JSON.parse(localStorage.getItem('user')).auth;
        const config = { headers: { 'authorization': token }, };

        axios.delete(`http://localhost:5000/delete-product/${_id}`, config)

            .then(res => {
                console.log(res);
                window.location.reload();



            })



    }


    return (
        <div className='product-list'>
            <h3> ProductList</h3>
            <ul>
                <li>S.No</li>
                <li>Image</li>
                <li>Name</li>
                <li>price</li>
                <li>Category</li>
                <li>Action</li>
            </ul>


            {myData.map((item, index) =>
                <ul key={item._id} >
                    <li>{index + 1}</li>
                    <li>{item.image}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li><button type='button' className='button' onClick={(e) => deleteProduct(e, item._id)}>Delete</button></li>
                </ul>
            )
            }
        </div>
    )
}

export default ProductList

