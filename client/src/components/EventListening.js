import React, {useEffect} from 'react';
import axios from "axios";

import {store as ntf} from 'react-notifications-component';


const EventListening = () => {

    useEffect(() => {
        subscribe()
    })
    const subscribe = async () => {
        try {
            const {data}= await axios.get('http://localhost:5000/api/notification', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            if (data){
                data.map(async notification => {
                    await axios.post(`http://localhost:5000/api/notification/delete/${notification.id}`, {}, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                    await ntf.addNotification({
                        title: "Manager notification",
                        message: notification.text,
                        type: "success",
                        insert: "bottom",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                    });
                })
            }
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    async function go() {
        await axios.get('http://localhost:5000/api/notification', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

        await axios.post(`http://localhost:5000/api/notification/delete/3`, {}, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

    }

    return (
        <div>
            <button onClick={() => go()}>FF</button>
        </div>
    );
};

export default EventListening;