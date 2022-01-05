import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import JoinTeam from "../components/modals/JoinTeam";
import {Button, Container} from "react-bootstrap";
import ChangeAvatar from "../components/modals/ChangeAvatar";

const PlayerMenu = () => {
    const {user, request} = useContext(Context)
    const [req, setReq] = useState(false);
    const [joinTeamVisible, setJoinTeamVisible] = useState(false)

    useEffect(() => {
        request.getRequestByAuthor();

        if(request.request){
            setReq(true)
        }
    }, [setJoinTeamVisible])
    return (
        <div>
            player menu
            <h2>User team is: {user.user.team == null ? "You are not in the team" : user.user.team}</h2>
            <h2>{req == null ? "Your request is here" : "You dont have req"}</h2>
            <Container className="d-flex flex-column">
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setJoinTeamVisible(true)}
                >
                    Join Team
                </Button>
                <JoinTeam show={joinTeamVisible} onHide={() => setJoinTeamVisible(false)}/>
            </Container>

        </div>
    );
};

export default PlayerMenu;