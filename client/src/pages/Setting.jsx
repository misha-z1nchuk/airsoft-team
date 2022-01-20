import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import ChangeAvatar from "../components/modals/ChangeAvatar";
import ChangeEmail from "../components/modals/ChangeEmail";

const Settings = () => {
    const [changeAvatarVisible, setChangeAvatarVisible] = useState(false)
    const [changeEmailVisible, setChangeEmailVisible] = useState(false)

    return (
       <div>
           <Container className="d-flex flex-column">
               <Button
                   variant={"outline-dark"}
                   className="mt-4 p-2"
                   onClick={() => setChangeAvatarVisible(true)}
               >
                   Change avatar
               </Button>
               <ChangeAvatar show={changeAvatarVisible} onHide={() => setChangeAvatarVisible(false)}/>
           </Container>
           <Container className="d-flex flex-column">
               <Button
                   variant={"outline-dark"}
                   className="mt-4 p-2"
                   onClick={() => setChangeEmailVisible(true)}
               >
                   Change email
               </Button>
               <ChangeEmail show={changeEmailVisible} onHide={() => setChangeEmailVisible(false)}/>
           </Container>
       </div>
    );
};

export default Settings;