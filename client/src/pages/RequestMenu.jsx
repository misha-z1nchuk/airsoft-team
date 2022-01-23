import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, ListGroup} from "react-bootstrap";

const RequestMenu = () => {
    const {user, teams, request} = useContext(Context)
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        request.getAllRequestsManager().then(res => {
            setRequests(res.data);
        })
    }, [])

    function accept(id) {
        request.acceptRequest(id);
    }

    return (
        <div className="">
            <h1 className="text-center">Requests list</h1>
            <ListGroup className="align-items-center">
                {requests.map((request) => (
                    <ListGroup.Item  key={request.id}  className="w-50 text-center">
                        Request id: {request.id}, User id:{request.userId}
                        wanna {request.action} team with id: {request.teamId}
                        <Button
                            className="ms-3"
                            variant={"outline-success"}
                            onClick={() => { accept(request.id)}}
                        >
                            Accept
                        </Button>
                        <Button className="ms-2" variant={"outline-danger"}>Decline</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default RequestMenu;