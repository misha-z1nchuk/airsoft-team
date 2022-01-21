import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";

const ChangePassword = ({show, onHide}) => {
    const {user} = useContext(Context)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    let clearForms = () => {
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }

    let changePassword = async () => {
        if (!password || !newPassword || !confirmNewPassword){
            alert("Enter info to form pls");
            return;
        }
        if(newPassword !== confirmNewPassword){
            alert("password doesnt match")
            return;
        }
        let res = await user.changePassword(password, newPassword);
        if(!res.status){
            alert(res)
        }
        if (res.status === 200){
            alert("Password is changed")
        }
        onHide();
        clearForms();
    }



    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter old password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter new password..."
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </Form>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Confirm password..."
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => {clearForms(); onHide();}}>Close</Button>
                <Button variant="outline-success" onClick={changePassword}>Change email</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePassword;