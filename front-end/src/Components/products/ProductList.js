import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'

const ProductList = () => {
    const [myData, setData] = useState([])
    const token = JSON.parse(localStorage.getItem('user')).auth;

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'authorization': token
        },
    };

    useEffect(() => {
        axios.get("http://localhost:5000/getAllProducts", config)
            .then((response) => setData(response.data))
    }, [])






















    return (
        <div>ProductList</div>
    )
}

export default ProductList



{/*  const getProducts = async () => {
        let result = await fetch('http://localhost:5000/getAllProducts')
        result = await result.json()
        setProducts(result)

        console.warn("products")
    } */}
