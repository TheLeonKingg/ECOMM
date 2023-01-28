import React, { useState, useEffect, } from "react";
import { useNavigate } from 'react-router-dom'
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";
import './SignUp.css';


const SignUp = () => {
    const [name, setName] = useState({ name: '', });
    const [email, setEmail] = useState({ email: '', });
    const [password, setPassword] = useState({ password: '', });
    const navigate = useNavigate();


    const collectData = async (e) => {

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
        setName({ ...name, [property]: event.target.value })
        setEmail({ ...email, [property]: event.target.value })
        setPassword({ ...password, [property]: event.target.value })
    };

    const resetData = () => {
        setName({ name: '', });
        setEmail({ email: '', });
        setPassword({ password: '', })
    };




    return (

        <div className="Auth-form-container">

            <form className="Auth-form" >

                <div className="Auth-form-content">
                    <h1 className="Auth-form-title">Sign Up</h1>

                    <div className="form-group mt-3">
                        <label>Full Name</label>

                        <input className="form-control" type="text" placeholder="Enter Name"
                            value={name.name} onChange={(e) => handleChange(e, 'name')}
                        />

                    </div>

                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input className="form-control" type="text" placeholder="Enter Email"
                            value={email.email} onChange={(e) => handleChange(e, 'email')}
                        />

                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input className="form-control" type="password" placeholder="Enter Password"
                            value={password.password} onChange={(e) => handleChange(e, 'password')}
                        />

                    </div>
                    <div className="BBT mt-3">
                        <button className="signup-btn" type="button" color="success" onClick={collectData} >
                            Signup
                        </button>
                        <Button onClick={(resetData)} className="reset" color="secondary" type="reset" >
                            Reset
                        </Button>
                    </div>
                </div>
            </form>
        </div >
    )
};

export default SignUp;





