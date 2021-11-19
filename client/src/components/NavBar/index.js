import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';




export default function Navigation() {
    return (
        <Navbar className="navbar-margin" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-item nav-link text-danger" to="/">Home</Link>
                    <Link className="nav-item nav-link text-danger" to="/BingeWorthy"> BingeWorthy </Link>
                    <Link className="nav-item nav-link text-danger" to="/Donate">Donate</Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}