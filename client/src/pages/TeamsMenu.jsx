import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TeamsMenu = () => {
    const {teams} = useContext(Context)

    const [teamA, setTeamA] = useState([])
    const [teamB, setTeamB] = useState([])

    useEffect( () => {
        teams.getAllTeamsPlayers().then((res) => {
            setTeamA(res.data.teamA);
            setTeamB(res.data.teamB);
        })
    }, [])
    return (
        <div className="d-flex justify-content-between w-50">
            <div>
                <h1>Team A players</h1>
                <ListGroup>
                    {teamA.map((user) => (
                        <ListGroup.Item key={user.id} className="">Email: {user.email} User id: {user.id}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className="">
                <h1>Team B players</h1>
                <ListGroup>
                    {teamB.map((user) => (
                        <ListGroup.Item key={user.id} className="">Email: {user.email} User id: {user.id}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>


        </div>
    );
};

export default TeamsMenu;