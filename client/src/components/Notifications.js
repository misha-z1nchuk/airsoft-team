import React, {useContext, useEffect, useRef} from 'react';
import axios from "axios";


import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import {io} from "socket.io-client";
import {Context} from "../index";


const Notifications = () => {

    const {user} = useContext(Context)

    var socket = io('http://localhost:5000');  // Server endpoint

    let role = user.user.roleId;
    console.log(role)
    socket.on('connect', function() {
        // Connected, let's sign-up for to receive messages for this room
        socket.emit('role', `${role}`);
    });

    socket.on('message', function(data) {
        store.addNotification({
            title: "Manager notification",
            message: data,
            type: "success",
            insert: "center",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 10000,
                onScreen: true
            }
        });
    });


    return (
        <div>
        </div>
    );
};

export default Notifications;