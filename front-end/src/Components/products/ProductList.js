import React, { useEffect, useState, axios } from 'react'

const ProductList = () => {
    const [products, setProducts,] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const auth = localStorage.getItem('user')

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/getAllProducts')
        result = await result.json()
        setProducts(result)

        console.warn("products")


    }







    return (
        <div>ProductList</div>
    )
}

export default ProductList