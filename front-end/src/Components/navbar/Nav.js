import React from "react";
import './Nav.css'
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap'

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
                <li><Button className="Btn-1"><Link to="/">Products</Link></Button></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Button className="Btn-1"><Link to="/add">Add Product</Link></Button></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Button className="Btn-1"><Link to="/update/:id">Update</Link></Button></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Button className="Btn-1"><Link to="/profile">Profile</Link></Button></li>&nbsp;&nbsp;&nbsp;&nbsp;
                <li><Button className="Btn-1"><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></Button></li>
            </ul>
                :
                <ul className="nav-ul nav-link-right">
                    <li><Link to="/signup">
                        <Button className="signup">Signup</Button>
                    </Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                    <li><Link to="/login">
                        <Button className="login">Login</Button>
                    </Link></li>
                </ul>
        }
        </div>
    )
}

export default Nav;