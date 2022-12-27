import React from "react";
import './Nav.css'
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div className="demo">{
            auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Link to="/add">Add Product</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Link to="/update">Update</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Link to="/profile">Profile</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className="nav-ul nav-link-right">
                    <li><Link to="/signup">Signup</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                    <li><Link to="/login">Login</Link></li>
                </ul>
        }
        </div>
    )
}

export default Nav;