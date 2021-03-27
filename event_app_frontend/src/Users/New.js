import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pick from 'lodash/pick';

import { create_user, fetch_users } from '../api';

function UsersNew() {
    let history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        passmsg: "",
    });

    function onSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(user);

        let data = pick(user, ['name', 'email', 'password'])
        create_user(data).then(() => {
            fetch_users();
            history.push("/users");
        });
    }

    function checkPass(p1, p2) {
        if(p1 !== p2) {
            return "Passwords don't match";
        }
        if(p1 < 8) {
            return "Password too short."
        }
        return "";
    }

    function update(field, ev) {
        let u1 = Object.assign({}, user);
        u1[field] = ev.target.value;
        u1.passmsg = checkPass(u1.password, u1.password2);
        setUser(u1);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                              onChange={(ev) => update("name", ev)}
                              value={user.name} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"
                              onChange={(ev) => update("email", ev)}
                              value={user.email} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              onChange={(ev) => update("password", ev)}
                              value={user.password} />
                <p>{user.passmsg}</p>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password"
                              onChange={(ev) => update("password2", ev)}
                              value={user.password2} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={user.passmsg !== ""}>
                Save
            </Button>
        </Form>
    );
}

function state2props(_state) {
    return {};
}

export default connect(state2props)(UsersNew);
