import { Card, Col, Container, Row } from 'react-bootstrap';
import { CardLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Event({event}) {
    console.log(event);
    return (
        <Col>
            <Container>
                <Card>
                    <Card.Header>
                        {event.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="text-muted">{event.date}</Card.Title>
                        <Card.Subtitle className="text-muted">{event.user.name}</Card.Subtitle>
                        <Card.Text>{event.description}</Card.Text>
                        <Card.Link><Link to={"/events/" + event.id}>View</Link></Card.Link>
                    </Card.Body>
                </Card>
            </Container>
        </Col>
    );
}

function Feed({events}) {
    let cards = events.map((event) => {
        return <Event event={event} key={event.id} />
    });

    return (
        <div>
            <Row>
                <Col>
                    <h1> Event Feed </h1>
                </Col>
            </Row>
            <Row>
                {cards}
            </Row>
        </div>
    );
}

export default connect(({events}) => ({events}))(Feed);
