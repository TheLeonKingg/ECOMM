import React, { useState, useEffect, } from "react";
import { useNavigate } from 'react-router-dom'
import { Container } from "reactstrap";
import { Card, CardBody, CardHeader, FormGroup, Row, Col, Button, } from 'reactstrap';
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
        /* <Container className='card'>
 
             <div className="box ">
 
                 <div className="input-fields">
                     <h1>Register</h1>
                     <input type="text" placeholder="Enter Name"
                         value={name} onChange={(e) => setName(e.target.value)}></input>
 
                     <input type="text" placeholder="Enter Email"
                         value={email} onChange={(e) => setEmail(e.target.value)}></input>
                     <input type="password" placeholder="Enter Password"
                         value={password} onChange={(e) => setPassword(e.target.value)}></input>
                     <button className="signup-btn" type="button" color="success" onClick={collectData} >Signup</button>
                 </div>
 
             </div>
 
         </Container> */


        <div style={{
            background: "skyblue",
            height: "750px"
        }} >

            <Container className="kosh">


                <Row className="mt-4">

                    <Col sm={{ size: 6, offset: 3 }}>

                        <Card>

                            <CardHeader>

                                <h4 style={{ color: "white" }}>Fill Information To Register !!</h4>

                            </CardHeader>

                            <CardBody style={{ background: "red" }}>

                                {/* creating Form   */}

                                <form onSubmit={submitForm}>

                                    {/*  Name field */}

                                    <FormGroup>
                                        <label for="name"> Enter Name </label>
                                        <br></br>

                                        <input
                                            type="text"
                                            placeholder="Enter Name Here"
                                            id="name"
                                            onChange={(e) => handleChange(e.target.value)}


                                        />

                                    </FormGroup>
                                    {/*  Email field */}
                                    <FormGroup>
                                        <label for="email"> Enter Email </label>
                                        <br></br>

                                        <input
                                            type="email"
                                            placeholder="Enter Email Here"
                                            id="email"
                                            onChange={(e) => handleChange(e.target.value)}

                                        />
                                    </FormGroup>
                                    {/*  Password field */}
                                    <FormGroup>
                                        <label for="password"> Enter Password </label>
                                        <br></br>

                                        <input
                                            type="password"
                                            placeholder="Enter Here"
                                            id="password"
                                            onChange={(e) => handleChange(e.target.value)}

                                        />
                                    </FormGroup>


                                    <br></br>
                                    <br></br>
                                    <Container className="text-center">
                                        <Button className="signup-btn">Register</Button>
                                        <Button onClick={resetData} className="reset-btn"> Reset</Button>

                                    </Container>



                                </form>
                            </CardBody>




                        </Card>






                    </Col>
                </Row>





            </Container>




        </div>




    )



}

export default SignUp; 