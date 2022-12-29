import React, { useState, useEffect, } from "react";
import { useNavigate } from 'react-router-dom'
import { Container } from "reactstrap";
import './SignUp.css';


const SignUp = () => {
    const [name, setData] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:5000/signup', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        result = await result.json();
        console.log(result);
        if (result) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })


    const handleChange = (event, property) => {

        //Dynamic setting the value
        setData({ [property]: event.target.value })
    };
    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: '',

        })
    };



    const submitForm = (event) => {
        event.preventDefault()

    }

    return (
        <Container className='card'>

            <div className="box ">

                <div className="input-fields">
                    <h1>Register</h1>
                    <input type="text" placeholder="Enter Name"
                        value={name} onChange={(e) => setData(e.target.value)}></input>

                    <input type="text" placeholder="Enter Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Enter Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button className="signup-btn" type="button" color="success" onClick={collectData} >Signup</button>
                    <button onClick={resetData} className="reset" color="secondary" type="reset" outline> Reset</button>
                </div>

            </div>

        </Container>


    )



}

export default SignUp; 