import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form } from "reactstrap";
import { useNavigate } from 'react-router-dom'
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

    return (
        <div className="appbg">

            <form className="login-form">

                <div className="Login">
                    <h2>Login</h2>
                </div>

                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>

                <div className="lg-bt">
                    <button className="login-button" type="button" onClick={collectData}>Login</button>
                </div>

            </form>
        </div>
    )
};
export default Login;



