import React, {useContext, useState} from 'react';
import Card from "react-bootstrap/Card";
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";


const ForgotPassword = () => {
    const {user} =useContext(Context)
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function clickFunc() {
        user.forgotPassword(email);
        navigate('/')
        alert("List to reset password was sent to email")
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 ">
                <h2 className="m-auto">Forgot password</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form>
                <Button className="mt-3"
                    variant={"outline-success"}
                        onClick={clickFunc}
                >
                    Send
                </Button>
            </Card>

        </Container>
    );
};

export default ForgotPassword;