import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import AppNav from './Nav';
import Feed from './Feed';
import UsersNew from './Users/New';
import EventsList from './Events/List';
import EventsNew from './Events/New';
import EventsShow from './Events/Show';


function App() {
  return (
      <Container>
          <AppNav />
          <Switch>
              <Route path="/" exact>
                  <Feed />
              </Route>
              <Route path="/users/new" exact>
                  <UsersNew />
              </Route>
              <Route path="/events" exact>
                  <EventsList />
              </Route>
              <Route path="/events/new" exact>
                  <EventsNew />
              </Route>
              <Route path="/events/:event_id" exact>
                  <EventsShow />
              </Route>
          </Switch>
      </Container>
  );
}

export default App;
