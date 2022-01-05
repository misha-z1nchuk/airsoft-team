import React, {useEffect} from 'react';
import axios from "axios";


import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

const EventListening = () => {

    useEffect(() => {
        subscribe()
    })

    const subscribe =async () => {
        const eventSource = new EventSource('http://localhost:5000/connect');
        eventSource.onmessage = async (event) => {
            const {data} = await axios.get('http://localhost:5000/api/notification', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            if (data) {
                await data.map(async notification => {
                    await axios.delete(`http://localhost:5000/api/notification/${notification.id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                    await setTimeout(() => {}, 1000)
                    await store.addNotification({
                        title: "Manager notification",
                        message: notification.text,
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
                })
            }
        }
    }

    return (
        <div>
        </div>
    );
};

export default EventListening;