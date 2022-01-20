import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {Context} from "../../index";

const ChangeTeam = ({show, onHide}) => {
    const {user, request} = useContext(Context)

    function changeTeam() {
        let newTeamId = 1;
        if (user.user.teamId == 1){
            newTeamId = 2;
        }
        request.changeTeam(newTeamId)
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Team
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>You can change team to {user.user.teamId == 1 ? "Team B" : "Team A"}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={changeTeam}>Change team</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeTeam;