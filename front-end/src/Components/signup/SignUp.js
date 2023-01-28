import React, { useState, useEffect, } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, Form } from "reactstrap";
import './SignUp.css';


const SignUp = () => {
    const [data, setData] = useState({ name: '', });
    const [email, setEmail] = useState({ email: '', });
    const [password, setPassword] = useState({ password: '', });
    const navigate = useNavigate();

    const collectData = async () => {
        console.log(data);

        let result = await fetch('http://localhost:5000/signup', {
            method: 'post',
            body: JSON.stringify({ data }),
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
        setData({ ...data, [property]: event.target.value })
        setEmail({ ...email, [property]: event.target.value })
        setPassword({ ...password, [property]: event.target.value })
    };

    const resetData = () => {
        setData({ name: '', });
        setEmail({ email: '', });
        setPassword({ password: '', })



    };


    return (


        <div className="Auth-form-container">

            <form className="Auth-form">

                <div className="Auth-form-content">
                    <h1 className="Auth-form-title">Sign Up</h1>

                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input className="form-control" type="text" placeholder="Enter Name"
                            value={data.name} onChange={(e) => handleChange(e, 'name')}></input>
                    </div>

                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input className="form-control" type="text" placeholder="Enter Email"
                            value={email.email} onChange={(e) => handleChange(e, 'email')}></input>
                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input className="form-control" type="password" placeholder="Enter Password"
                            value={password.password} onChange={(e) => handleChange(e, 'password')}></input></div>
                    <div className="BBT mt-3">
                        <button className="signup-btn" type="button" color="success" onClick={collectData} >Signup</button>
                        <Button onClick={(resetData)} className="reset" color="secondary" type="reset" > Reset</Button> </div>

                </div>

            </form>
        </div >
    )
};

export default SignUp; 