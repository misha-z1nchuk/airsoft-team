import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import ChangeAvatar from "../components/modals/ChangeAvatar";

const Admin = () => {
    const [changeAvatarVisible, setChangeAvatarVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setChangeAvatarVisible(true)}
            >
                Change avatar
            </Button>
            <ChangeAvatar show={changeAvatarVisible} onHide={() => setChangeAvatarVisible(false)}/>
        </Container>
    );
};

export default Admin;