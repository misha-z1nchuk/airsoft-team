import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, ListGroup} from "react-bootstrap";

const AdminPanel = () => {
    const {user} = useContext(Context)
    const [players, setPlayers] = useState([])
    const [managers, setManagers] = useState([])

    useEffect( () => {
        user.getUsersForAdmin().then((res) => {
            setPlayers(res.data.players);
            setManagers(res.data.managers);
        })
    }, [])

    console.log(players)
    return (
        <div className="d-flex justify-content-between w-75">
            <div>
                <h1>Players</h1>
                <ListGroup>
                    {players.map((user) => (
                        <ListGroup.Item key={user.id} className="">Email: {user.email} User id: {user.id}
                            {user.isBanned ? <Button>Unblock</Button> : <Button>Block</Button>}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className="">
                <h1>Managers</h1>
                <ListGroup>
                    {managers.map((user) => (
                        <ListGroup.Item key={user.id} className="">Email: {user.email} User id: {user.id}
                            {user.isBanned ? <Button>Unblock</Button> : <Button>Block</Button>}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>


        </div>
    );
};

export default AdminPanel;