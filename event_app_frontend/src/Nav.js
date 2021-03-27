import { Alert, Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';

import { api_login } from './api.js'

function LoginForm() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function on_submit(ev) {
        ev.preventDefault();
        console.log("Login clicked", email, pass);
        api_login(email, pass);
    }

    return (
        <Nav>
            <Link to="/users/new">Register</Link>
            <Form onSubmit={on_submit} inline>
                <Form.Control name="email"
                              type="email"
                              onChange={(ev) => setEmail(ev.target.value)}
                              placeholder="Email"
                              value={email} />
                <Form.Control name="password"
                              type="password"
                              onChange={(ev) => setPass(ev.target.value)}
                              placeholder="Password"
                              value={pass} />
                <Button variant="outline-secondary" type="submit">
                    Login
                </Button>
            </Form>
        </Nav>
    );
}

let SessionInfo = connect()(({session, dispatch}) => {
    function logout() {
        dispatch({type: 'session/clear'});
    }
    console.log("session_info", session, typeof(session.name));
    return (
        <Nav>
            <Navbar.Text>
                User: {session.name} &nbsp;
            </Navbar.Text>
            <Button variant="outline-secondary" onClick={logout}>Logout</Button>
        </Nav>
    );
})

function LOI({session}) {
    if(session) {
        return (<SessionInfo session={session} />);
    } else {
        return (<LoginForm />);
    }
}

const LoginOrLogoutNav = connect(({session}) => ({session}))(LOI);

function Link({to, children}) {
    return (
        <Nav.Item> 
            <NavLink to={to} exact className="nav-link"
                     activeClassName="active">
                {children}
            </NavLink>
        </Nav.Item>
    );
}

function AppNav({error}) {
    let error_row = null;

    if(error) {
        error_row = (<Alert variant="danger">{error}</Alert>);
    }

    return (
        <div>
            <Container>
                <Navbar variant="light" bg="light">
                    <Nav>
                        <Link to="/">Home</Link>
                        <Link to="/events">Events</Link>
                    </Nav>
                    <LoginOrLogoutNav />
                </Navbar>
            </Container>
            <Container> { error_row } </Container>
        </div>
    );
}

export default connect(({error}) => ({error}))(AppNav);
