import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error, data }] = useMutation(LOGIN_USER);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value});
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.log(err);
            setShowAlert(true);
        }

        setUserFormData({ username: "", email: "", password: "" });
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="container">
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
                    Something went wrong with your login credentials!
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor="email">
                        Email
                    </Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Your email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Email is required!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="password">
                        Password
                    </Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <div className="container">
                    <Button
                        disabled={!(userFormData.email && userFormData.password)}
                        type="submit"
                        variant="success"
                        className="mt-5 bg-white text-dark"
                    >
                        Submit
                    </Button>
                </div>
                <div>
                    Don't have an account? <Link to="/signup" className="text-light">Create one here.</Link>
                </div>
            </Form>
        </>
    )
};

export default LoginForm;