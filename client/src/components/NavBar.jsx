import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {SERVICE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SERVICE_ROUTE}>Airsoft</NavLink>
                { user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={() => user.logout()}>Log out</Button>
                            <Button variant={"outline-light"}
                                    onClick={() => navigate('/settings')}
                                    className="ml-2"
                            >
                                Settings
                            </Button>
                        {
                            user.user.roleId === 1 ?
                                <Button variant={"outline-light"}
                                        onClick={() => navigate('/player-menu')}
                                        className="ml-2"
                                >
                                    PlayerMenu
                                </Button>
                                : <div/>
                        }
                    </Nav>

                    :

                    <Nav className="ms-auto">
                        <Button variant={"outline-light"} onClick={() => navigate('/login')}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
