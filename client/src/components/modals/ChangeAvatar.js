import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";

const ChangeAvatar = ({show, onHide}) => {
    const {user} = useContext(Context)
    const [file, setFile] = useState(null);

    let changeAvatar = () => {
        const formData = new FormData();
        if(!file){
            window.alert("Choose file!!!")
            return
        }
        formData.append('img', file);
        user.changePhoto(formData)
        onHide();
    }


    const selectFile = e => {
        setFile(e.target.files[0])
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change avatar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={selectFile}
                        type="file"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={changeAvatar}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeAvatar;