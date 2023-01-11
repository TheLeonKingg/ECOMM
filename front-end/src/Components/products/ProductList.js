import axios from 'axios';
import React from 'react';
import { useEffect, useState, } from 'react';
import { Button } from 'reactstrap';
import "./productlist.css";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ProductList = () => {
    const [myData, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem('user')).auth;
    const config = { headers: { 'authorization': token }, };
    const params = useParams();


    useEffect(() => {
        axios.get("http://localhost:5000/getAllProducts", config,)

            .then((response) => setData(response.data))

    }, []);



    const deleteProduct = (e, _id, params) => {
        e.preventDefault()
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"

        const token = JSON.parse(localStorage.getItem('user')).auth;
        const config = { headers: { 'authorization': token }, };

        axios.delete(`http://localhost:5000/delete-product/${_id}`, config,)

            .then(res => {
                console.warn(res);
                //setData(myData.filter(item => item._id !== quantity));

                window.location.reload();
            });
    };
    return (

        <>
            <div className='product-list'>
                <h2> ProductList</h2>
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
                        {myData.map((item, index) => <tr key={item._id} className='tbody'>
                            <th scope="row">{index + 1}</th>
                            <td>{item.image}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td><Button type='button' className='btn-delete' onClick={(e) => deleteProduct(e, item._id, item.quantity)}>Delete</Button>
                                <Button className='Btn-update'><Link to={"/update/" + item._id}>Update</Link></Button></td>
                        </tr>

                        )} </tbody>
                </table>
            </div>
        </>

    )
};

export default ProductList;






