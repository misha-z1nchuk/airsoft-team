import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {API_URL} from "../http";

let roles = {
    1: "Player",
    2: "Manager",
    3: "Admin"
}


const Main = () => {
    const {user} = useContext(Context)
    return (
        <div>
            Main
            { user.isAuth ?
                <div className="align-items-center">
                    <h2> Profile info: {user.user.email}</h2>
                    <h2>Role : {roles[user.user.role]}</h2>
                    <h2>Profile photo: </h2>
                    {user.user.photo ?
                        <img className="" src={"http://localhost:5000/"+user.user.photo} />
                        :
                        <h3>No photo</h3>

                    }
                </div>

                :
                <h1>Authorize pls</h1>
            }
        </div>
    );
};

export default Main;