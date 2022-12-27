import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const AddProduct = ()=>{
    const [name,setName]= useState("");
    const [price,setPrice] = useState("");
    const [company,setCompany] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState("");


    const collectData =async (e)=>{
        e.preventDefault()
        console.log(name,price,company,category,image);
        const formData = new FormData();
        const url = 'http://localhost:5000/add-product'
        formData.append('name', name);
        formData.append('price', price);
        formData.append('company', company);
        formData.append('category', category);
        formData.append('file', image);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            if(response.data){
              alert(`${response.data.name} added successfully`);
            }
          });
        }

    return (
        <form action="/upload" enctype="multipart/form-data" method="post" onSubmit={collectData}>
            <div className="input-fields" >
                
                <h1>Add Product</h1>
                <input type="text" placeholder="Enter Name"
                value={name} onChange={(e)=>setName(e.target.value)}></input>
                <input type="number" placeholder="Enter Price"
                value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                <input type="text" placeholder="Enter Company"
                value={company} onChange={(e)=>setCompany(e.target.value)}></input>
                <input type="text" placeholder="Enter Category"
                value={category} onChange={(e)=>setCategory(e.target.value)}></input>
                <input type="file"  name="uploaded_file"
                onChange={(e)=>setImage(e.target.files[0])}></input>
                <button className="signup-btn" type= "submit">Add</button>
            </div>
        </form>
    )
}

export default  AddProduct; 