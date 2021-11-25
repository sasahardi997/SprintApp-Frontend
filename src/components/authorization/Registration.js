import React, { useState } from 'react';
import {Form, Button, Row, Col, FormGroup} from 'react-bootstrap';
import { registration } from '../../services/auth';

const Registration = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onInputChanged = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        if(name === 'username'){
            setUsername(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
        if(name === "confirmPassword"){
            setConfirmPassword(value);
        }
    }

    const inputIsValid = () => {
        if(username.length < 6 || password.length < 6 || confirmPassword.length < 6){
            alert("Username and Password must contain at least 6 characters!");
        } else if(password !== confirmPassword){
            alert("Password and Confirm Password do not match!");
        } else{
            return true;
        }
    }

    const sendRegistrationCred = () => {
        if(inputIsValid()){
            registration(username, password, confirmPassword);
        }
    }

    return (
        <div>
            <h3 style={{textAlign: 'center', marginTop: "45px"}}>Registration</h3>

            <Row className="justify-content-center">
                <Col md={6}>
                    <Form>
                        <FormGroup>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                value={username}
                                as="input"
                                type="text"
                                name="username"
                                onChange={(e) => {onInputChanged(e)}}>
                            </Form.Control>
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                value={password}
                                as="input"
                                type="password"
                                name="password"
                                onChange={(e) => {onInputChanged(e)}}>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                value={confirmPassword}
                                as="input"
                                type="password"
                                name="confirmPassword"
                                onChange={(e) => {onInputChanged(e)}}>
                            </Form.Control>
                        </FormGroup>
                        <Button style={{position: 'absolute', marginTop: '20px'}} variant="success" onClick={() => sendRegistrationCred(username, password, confirmPassword)}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Registration;