import React, { useState } from "react";
import { Link, useNavigate, NavLink as ReactLink } from "react-router-dom";
import { Button } from 'reactstrap'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, } from 'reactstrap';
import './Nav.css'


const New = (args) => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>

            <div>


                <Navbar style={{ backgroundColor: "Black" }} {...args}>
                    <NavbarBrand style={{ color: "white" }} tag={ReactLink} to='/'>Welcome to Bulbkart</NavbarBrand>
                    <NavbarToggler style={{ backgroundColor: "white" }} onClick={toggle} />

                    <Collapse isOpen={isOpen} navbar>
                        {auth ?
                            <Nav className="me-auto" navbar>
                                <NavItem>
                                    <NavLink style={{ color: "white" }} tag={ReactLink} to='/'>Products List</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ color: "white" }} tag={ReactLink} to='/add'>Add Products</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ color: "white" }} tag={ReactLink} to='/profile'>Profile </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{ color: "white" }} onClick={logout} tag={ReactLink} to='/signup'>
                                        Logout
                                    </NavLink>
                                    <NavLink style={{ color: "white" }} tag={ReactLink} to='/cart'>
                                        Cart
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            :
                            <>
                                <Nav>
                                    <NavItem>
                                        <NavLink style={{ color: "white" }} tag={ReactLink} to='/signup'>Signup</NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav>
                                    <NavItem>
                                        <NavLink style={{ color: "white" }} tag={ReactLink} to='/login'>Login</NavLink>
                                    </NavItem>
                                </Nav>

                            </>
                        }
                    </Collapse>



                </Navbar>
            </div>

        </>

    )
}

export default New;