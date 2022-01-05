import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button, DropdownButton, Dropdown} from "react-bootstrap";
import {Context} from "../../index";
import $api from "../../http";

const JoinTeam = ({show, onHide}) => {
    const {user, request} = useContext(Context)
    const [teamId, setTeamId] = useState(null);

    function handleSelect(e) {
        setTeamId(e)
    }

    function joinTeam() {
        request.joinTeam(teamId)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Join Team
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DropdownButton
                    title="Choose team"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                    className="mt-2"
                >
                    <Dropdown.Item eventKey="1">Team A</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Team B</Dropdown.Item>
                </DropdownButton>
                <h4>You selected {teamId == 1 ? "Team A" : "Team B"}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={joinTeam}>Join</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default JoinTeam;