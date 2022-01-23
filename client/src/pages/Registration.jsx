import React, {useContext, useEffect, useState} from 'react';
import {Container, Dropdown, DropdownButton, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink,useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Roles from "../utils/enums";

const Login = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role,setRole]=useState(1);

    useEffect(() => {
        if (user.isAuth)
            navigate('/')
    })


    const click = async () => {
        try {
            let data = await user.registration(firstName, lastName, email, password, role);
            navigate('/')
        } catch (e) {
            alert(e.response?.data?.message)
        }
    }

    const handleSelect= async (e)=> {
        if(e === 'Manager')
            await setRole(2)
        else
            await setRole(1)

        console.log(role)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Registration</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="First name..."
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Last name..."
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <DropdownButton
                        title="Choose role"
                        id="dropdown-menu-align-right"
                        onSelect={handleSelect}
                        className="mt-2"
                    >
                        <Dropdown.Item eventKey="Player">Player</Dropdown.Item>
                        <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                    </DropdownButton>
                    <h4>You selected {role === Roles.PLAYER ? "Player" : "Manager"}</h4>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">

                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Register
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Login;
