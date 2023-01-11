import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./UpdateProduct.css"




const UpdateProduct = () => {
    const [name, setName] = React.useState({});
    const [price, setPrice] = React.useState({});
    const [company, setCompany] = React.useState({});
    const [category, setCategory] = React.useState({});
    const [quantity, setQuantity] = React.useState({});
    const [image, setImage] = React.useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductsDetails = () => {
            //console.warn(params)
            const token = JSON.parse(localStorage.getItem('user')).auth;
            const config = { headers: { 'authorization': token }, };

            axios.get(`http://localhost:5000/product/${params.id}`, config)
                .then(res => {
                    //console.log(res)
                    setName(res.data.name);
                    setPrice(res.data.price);
                    setCompany(res.data.company);
                    setCategory(res.data.category);
                    setQuantity(res.data.quantity);
                });

        }

        getProductsDetails();
    }, []);


    const updateProduct = (e) => {
        e.preventDefault()
        const formData = new FormData();
        const url = `http://localhost:5000/updateProduct/${params.id}`
        formData.append('name', name);
        formData.append('price', price);
        formData.append('company', company);
        formData.append('category', category);
        formData.append('file', image);
        formData.append('quantity', quantity);
        const token = JSON.parse(localStorage.getItem('user')).auth;
        const config = {
            headers: {
                'authorization': token
            },
        };
        axios.put(url, formData, config).then((response) => {

            if (response.data) {
                alert(` updated successfully`);

                navigate('/')
            };
        }

        )
    };

    return (
        <>
            <container className="box">

                <div className="input-fields" >
                    <h1>Update Product</h1>

                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Enter Name"
                                value={name} onChange={(e) => setName(e.target.value)}></input> </div>
                        <div className="form-group">
                            <input type="number" placeholder="Enter Price"
                                value={price} onChange={(e) => setPrice(e.target.value)}></input> </div>
                        <div className="form-group">
                            <input type="text" placeholder="Enter Company"
                                value={company} onChange={(e) => setCompany(e.target.value)}></input> </div>
                        <div className="form-group">
                            <input type="text" placeholder="Enter Category"
                                value={category} onChange={(e) => setCategory(e.target.value)}></input> </div>
                        <div className="form-group">
                            <input type="number" placeholder="Enter Quantity"
                                value={quantity} onChange={(e) => setQuantity(e.target.value)}></input> </div>
                        <div className="form-group">
                            <input type="file" name="uploaded_file"
                                onChange={(e) => setImage(e.target.files[0])}></input> </div>
                    </form>
                    <button className="update-btn" onClick={updateProduct} >Update Product</button>


                </div>
            </container>
        </>

    )
};


export default UpdateProduct; 