import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import JoinTeam from "../components/modals/JoinTeam";
import {Button, Card, Container} from "react-bootstrap";
import ChangeTeam from "../components/modals/ChangeTeam";
import {observer} from "mobx-react-lite";

const PlayerMenu = observer(() => {
    const {user, request} = useContext(Context)
    const [req, setReq] = useState(null);
    const [joinTeamVisible, setJoinTeamVisible] = useState(false)
    const [changeTeamVisible, setChangeTeamVisible] = useState(false)


    useEffect(async () => {
        await request.getRequestByAuthor();
        setReq(request.request)
    }, [changeTeamVisible])

    async function declineReq() {
        await request.declineReq(request.request.id);
        setReq(null);
    }

    return (
        <div>
            player menu
            <h2>User team is: {user.user.teamId == null ? "You are not in the team" : user.user.teamId}</h2>
            <h2>{req ?
                <div>
                    <div>Your request is here</div>
                    <div className="d-flex">
                        <Card body className="d-grid w-50 bg-light">{req.action} team with id: {req.id}</Card>
                        <Button className="d" onClick={declineReq}>Decline</Button>
                    </div>
                </div>
                : "You dont have req"}</h2>


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
            {(user.user.teamId !== null) ?
                <Container className="d-flex flex-column">
                    <Button
                        variant={"outline-dark"}
                        className="mt-4 p-2"
                        onClick={() => setChangeTeamVisible(true)}
                    >
                        Change team
                    </Button>
                    <ChangeTeam show={changeTeamVisible} onHide={() => setChangeTeamVisible(false)}/>
                </Container>
                :
                <div/>
            } }


        </div>
    );
});

export default PlayerMenu;