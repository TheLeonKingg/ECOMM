import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import "./productlist.css"

const ProductList = () => {
    const [myData, setData] = useState([])
    const token = JSON.parse(localStorage.getItem('user')).auth;
    const config = { headers: { 'authorization': token }, };

    useEffect(() => {
        axios.get("http://localhost:5000/getAllProducts", config)
            .then((response) => setData(response.data))
    }, [])

    return (
        <div className='product-list'>
            <h3> ProductList</h3>
            <ul>
                <li>S.No</li>
                <li>Image</li>
                <li>Name</li>
                <li>price</li>
                <li>Category</li>
            </ul>

            {
                myData.map((item, index) =>
                    <ul key={item}>
                        <li>{index + 1}</li>
                        <li>{item.image}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                    </ul>
                )
            }





        </div>
    )
}

export default ProductList

