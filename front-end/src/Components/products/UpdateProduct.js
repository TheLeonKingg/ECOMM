import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';




const UpdateProduct = () => {
    const [name, setName] = React.useState({});
    const [price, setPrice] = React.useState({});
    const [company, setCompany] = React.useState({});
    const [category, setCategory] = React.useState({});
    const [image, setImage] = React.useState({});
    const params = useParams();

    useEffect(() => {
        const getProductsDetails = () => {
            console.warn(params)
            const token = JSON.parse(localStorage.getItem('user')).auth;
            const config = { headers: { 'authorization': token }, };

            axios.get(`http://localhost:5000/product/${params.id}`, config)
                .then(res => {
                    console.log(res)
                    setName(res.data.name);
                    setPrice(res.data.price);
                    setCompany(res.data.company);
                    setCategory(res.data.category);
                })

        }

        getProductsDetails();
    }, []);


    const updateProduct = async (e) => {
        console.warn(name, price, category, company)

    }

    return (
        <form>
            <div className="input-fields" >
                <h1>Update Product</h1>
                <input type="text" placeholder="Enter Name"
                    value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="number" placeholder="Enter Price"
                    value={price} onChange={(e) => setPrice(e.target.value)}></input>
                <input type="text" placeholder="Enter Company"
                    value={company} onChange={(e) => setCompany(e.target.value)}></input>
                <input type="text" placeholder="Enter Category"
                    value={category} onChange={(e) => setCategory(e.target.value)}></input>
                <input type="file" name="uploaded_file"
                    onChange={(e) => setImage(e.target.files[0])}></input>
                <button className="update-btn" onClick={updateProduct} >Update Product</button>
            </div>
        </form>
    )
};


export default UpdateProduct; 