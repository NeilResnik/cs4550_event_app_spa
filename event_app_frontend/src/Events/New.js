import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_event, fetch_events } from '../api';

function EventsNew() {
    let history = useHistory();
    const [event, setEvent] = useState({
        name: "",
        date: "",
        description: "",
    });

    function onSubmit(ev) {
        ev.preventDefault();
        console.log(ev);
        console.log(event);

        create_event(event).then(() =>{
            fetch_events();
            history.push("/events");
        });
    }

    function update(field, ev) {
        let e1 = Object.assign({}, event);
        e1[field] = ev.target.value;
        setEvent(e1);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                              onChange={(ev) => update("name", ev)}
                              value={event.name} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date"
                              onChange={(ev) => update("date", ev)}
                              value={event.date} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text_input"
                              onChange={(ev) => update("description", ev)}
                              value={event.description} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    );
}

export default connect(({}) => ({}))(EventsNew);
