import React, { useState } from "react";
import { Form, useNavigate } from 'react-router-dom'
import "./login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const collectData = async () => {
        console.log(email, password);
        let loginResult = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        loginResult = await loginResult.json();
        console.log(loginResult);
        if (loginResult.user.name) {
            localStorage.setItem('user', JSON.stringify(loginResult));
            navigate('/');
        } else {
            alert("Invalid Entries")
        }
    }

    // useEffect(()=>{
    //     const auth = localStorage.getItem('user');
    //     if(auth){
    //         navigate('/')
    //     }
    // })
    return (
        <div className="login-fields">
            <h1>Login   </h1>

            <input type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button className="login-button" type="button" onClick={collectData}>Login</button>

        </div>
    )
}


export default Login;
















