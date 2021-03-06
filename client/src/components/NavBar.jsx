import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {SERVICE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import Roles from "../utils/enums";

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
                            user.user.roleId === Roles.PLAYER ?
                                <Button variant={"outline-light"}
                                        onClick={() => navigate('/player-menu')}
                                        className="ml-2"
                                >
                                    PlayerMenu
                                </Button>
                                : <div/>
                        }
                        {
                            user.user.roleId === Roles.MANAGER ?
                                <Button variant={"outline-light"}
                                        onClick={() => navigate('/request-menu')}
                                        className="ml-2"
                                >
                                    RequestMenu
                                </Button>
                                : <div/>
                        }
                        {
                            user.user.roleId === Roles.ADMIN ?
                                <Button variant={"outline-light"}
                                        onClick={() => navigate('/admin-menu')}
                                        className="ml-2"
                                >
                                    Admin Panel
                                </Button>
                                : <div/>
                        }
                        <Button variant={"outline-light"}
                                onClick={() => navigate('/teams-menu')}
                                className="ml-2"
                        >
                            TeamsMenu
                        </Button>
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
