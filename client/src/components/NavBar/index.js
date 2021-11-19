import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Link } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Auth from '../../utils/auth';

export default function Navigation() {
    return (
        <Navbar className="navbar-margin navigation" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-item nav-link text-white" to="/">Home</Link>
                    <Link className="nav-item nav-link text-white" to="/BingeWorthy"> BingeWorthy </Link>
                    <Link className="nav-item nav-link text-white" to="/Donate">Donate</Link>
                    {Auth.loggedIn() ? (
                        <>
                            <Nav.Link className="nav-item nav-link text-white" as={Link} to="/lists">
                                See your lists
                            </Nav.Link>
                            <Nav.Link className="nav-item nav-link text-white" onClick={Auth.logout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link className="nav-item nav-link text-white" as={Link} to="/login">Login/Sign Up</Nav.Link>
                        // <Nav.Link className="nav-item nav-link text-white" onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}