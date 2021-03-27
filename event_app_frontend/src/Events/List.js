import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function EventsList({events, session}){
    let rows = events.map((event) => {
        let controls = null;
        if(session.email === event.user.email) {
            controls = (
                <span>
                    <Link to={"/events/" + event.id + "/edit"}>Edit</Link>
                    <Link to={"/events/" + event.id + "/delete"}>Delete</Link>
                </span>
            );
        }
        return (
            <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
                <td>{event.user.name}</td>
                <td>{controls}</td>
            </tr>
        );
    });

    let new_event_link = null;
    if(session) {
        new_event_link = (<p><Link to="/events/new">New Event</Link></p>);
    }

    return (
        <Container>
            <Table striped>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Posted By</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
            {new_event_link}
        </Container>
    );
}

export default connect(({users, session, event_form}) => ({users, session, event_form}))(EventsList);
