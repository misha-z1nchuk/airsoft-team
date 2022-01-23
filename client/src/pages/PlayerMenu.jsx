import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import JoinTeam from "../components/modals/JoinTeam";
import {Button, Card, Container, ListGroup} from "react-bootstrap";
import ChangeTeam from "../components/modals/ChangeTeam";
import {observer} from "mobx-react-lite";

const PlayerMenu = observer(() => {
    const {user, teams, request} = useContext(Context)
    const [req, setReq] = useState(null);
    const [joinTeamVisible, setJoinTeamVisible] = useState(false)
    const [changeTeamVisible, setChangeTeamVisible] = useState(false)
    const [team, setTeam] = useState([])


    useEffect(async () => {
        await request.getRequestByAuthor();
        if(user.user.teamId){
            await teams.getCertainTeamPlayer(user.user.teamId).then((res) => {
                setTeam(res.data);
            })
        }
        setReq(request.request)
    }, [changeTeamVisible])

    async function declineReq() {
        await request.declineReq(request.request.id);
        setReq(null);
    }

    async function quitTeam() {
        await request.quitTeam();

    }

    return (
        <div>
            player menu
            <h2>User team is: {user.user.teamId == null ? "You are not in the team" : user.user.teamId === 1 ? " A": "B"}</h2>
            <h2>{req ?
                <div>
                    <div>Your request is here</div>
                    <div className="d-flex">
                        <Card body className="d-grid w-50 bg-light">{req.action} team with id: {req.teamId}</Card>
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
                <div>
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
                    <Container className="d-flex flex-column">
                        <Button
                            variant={"outline-dark"}
                            className="mt-4 p-2"
                            onClick={quitTeam}
                        >
                            Quit Team
                        </Button>
                    </Container>
                </div>
                :
                <div/>
            } }


            { user.user.teamId !== null ?
                <div className="d-flex justify-content-between w-50">
                    <div>
                        <h1>Your team players</h1>
                        <ListGroup>
                            {team.map((player) => (
                                <ListGroup.Item key={player.id} className="d-flex">Email: {player.email} User id: {player.id} {user.user.id === player.id ? <div className="ms-2 bg-info">You</div> : ""}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>

                :
                <div/>
            }



        </div>
    );
});

export default PlayerMenu;