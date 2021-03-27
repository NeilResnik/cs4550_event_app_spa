import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';

import { create_comment, create_invite, fetch_single_event } from '../api';

function NewComment({event, session}){
    const [comment, setComment] = useState("");
    function onSubmit() {
        let new_comment = {
            event_id: event.id,
            user_id: session.user_id,
            body: comment
        };
        create_comment(new_comment);
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Control type="text_input"
                          onChange={(ev) => setComment(ev.target.value)} />
            <Button variant="outline-primary" type="submit">Submit</Button>
        </Form>
    );
}

function InviteControl({invite, session}) {
    const [status, setStatus] = useState(invite.status);
    function onSubmit() {
        console.log("Edit Invite");
    }

    return (
        <Form onSubmit={onSubmit} inline>
            <Form.Group>
                <Form.Label>Coming?</Form.Label>
                    <Form.Control as="select" 
                                  value={status}
                                  onChange={(ev) => setStatus(ev.target.value)}>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Maybe</option>
                </Form.Control>
            </Form.Group>
            <Button variant="outline-secondary" type="submit">Submit</Button>
        </Form>
    );
}

function EventsShow({events, session}) {
    let match = useRouteMatch();
    let event = null;
    for(event in events) {
        if (events.id == match.params.event_id){
            break;
        }
    }
    let comments = event.comments.map((comm) => {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Author: {comm.user.name}</Card.Title>
                    <Card.Text>{comm.body}</Card.Text>
                </Card.Body>
            </Card>
        );
    });
    let user_invited = false;
    let coming = 0;
    let not_coming = 0;
    let maybes = 0;
    for(let inv in event.invites) {
        if(inv.status === "Yes") {
            coming += 1;
        } else if(inv.status === "No") {
            not_coming += 1;
        } else if(inv.status === "Maybe") {
            maybes += 1;
        }
        if(session && session.email === inv.user_email) {
            user_invited = true;
        }
    }


    let new_invite = null;
    let invites = null;
    let controls = null;
    let new_comment = null;
    if(session) {
        if(event.user.id === session.user_id) {
            controls = (
                <div>
                    <span><Link to={"/events/" + event.id + "/edit"}>Edit</Link></span>
                    <span><Link to={"/events/" + event.id + "/delete"}>Delete</Link></span>
                </div>
            );
            // TODO: new_invite
        }

        if(event.user.id === session.user_id || user_invited) {
            let invite_rows = event.invites.map((inv) => {
                let inv_ctr = null;
                if(session.email === inv.user_email) {
                    inv_ctr = (<InviteControl invite={inv} session={session}/>)
                }
                return (
                    <tr>
                        <td>
                            {inv.user_email}
                        </td>
                        <td>
                            {inv.status}
                        </td>
                        <td>
                            {inv_ctr}
                        </td>
                    </tr>
                )
            });
            let invites = (
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invite_rows}
                    </tbody>
                </Table>
            );
        }

        new_comment = (<NewComment session={session}/>);
    }

    return (
        <div>
            <Row>
                <Col>
                    <ul>
                        <li>
                            <strong>Name:</strong>
                            {event.name}
                        </li>
                        <li>
                            <strong>Date:</strong>
                            {event.date}
                        </li>
                        <li>
                            <strong>Description:</strong>
                            {event.Description}
                        </li>
                        <li>
                            <strong>Posted By:</strong>
                            {event.user.name}
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    {controls}
                </Col>
            </Row>
            <Row>
                <Col>
                    Coming: {coming}
                </Col>
                <Col>
                    Not Coming: {not_coming}
                </Col>
                <Col>
                    Maybe Coming: {maybes}
                </Col>
            </Row>
            <Row>
                <Col>
                    {new_invite}
                    {invites}
                </Col>
            </Row>
            <Row>
                <Col>
                    {comments}
                    {new_comment}
                </Col>
            </Row>
        </div>
    );
}

export default connect(({session}) => ({session}))(EventsShow);
