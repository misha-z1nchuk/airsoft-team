import React, {useContext, useState} from 'react';
import {useParams} from "react-router";
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const {user} = useContext(Context)
    const [password, setPassword] = useState("");
    const {token} = useParams();
    const navigate = useNavigate();


    function clickFunc() {
        let status = user.resetPassword(password, token);
        navigate("/")
        if(status == 200){
            alert("Password changed")
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 ">
                <h2 className="m-auto">Create new password</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter new password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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

export default ResetPassword;