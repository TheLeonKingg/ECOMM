import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = ()=>{
    const [name,setName]= useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const collectData =async ()=>{
        console.log(name,email,password);
        let result = await fetch('http://localhost:5000/signup',{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{'Content-Type':'application/json'},
        })
        result = await result.json();
        console.log(result);
        if(result){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
        }
    }

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
    return (
        <div className="input-fields">
            <h1>Register</h1>
            <input type="text" placeholder="Enter Name"
            value={name} onChange={(e)=>setName(e.target.value)}></input>
            <input type="text" placeholder="Enter Email"
            value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter Password"
            value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button className="signup-btn" type= "button" onClick={collectData}>Signup</button>
        </div>
    )
}

export default SignUp ; 