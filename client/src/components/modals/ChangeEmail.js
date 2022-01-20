import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";

const ChangeEmail = ({show, onHide}) => {
    const {user, } = useContext(Context)
    const [email, setEmail] = useState('')


    async function changeMail() {
        await user.changeMail(email);
        onHide();
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
                        placeholder="Enter new email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={changeMail}>Change email</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeEmail;