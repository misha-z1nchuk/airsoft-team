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


    return (
        <div className="">
            <h1 className="text-center">Requests list</h1>
            <ListGroup className="align-items-center">
                {requests.map((userRequest) => (
                    <ListGroup.Item  key={userRequest.id}  className="w-50 text-center">
                        Request id: {userRequest.id}, User id:{userRequest.userId}
                        wanna {userRequest.action} team with id: {userRequest.teamId}
                        <Button
                            className="ms-3"
                            variant={"outline-success"}
                            onClick={() => { request.acceptRequest(userRequest.id)}}
                        >
                            Accept
                        </Button>
                        <Button
                            className="ms-2"
                            variant={"outline-danger"}
                            onClick={() => { request.declineRequest(userRequest.id)}}
                        >
                            Decline
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default RequestMenu;