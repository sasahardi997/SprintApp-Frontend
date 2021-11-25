import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/authorization/Login';
import Registration from './components/authorization/Registration';
import EditTask from './components/pages/EditTask';
import NotFound from './components/pages/NotFound';
import Tasks from './components/pages/Tasks';
import Notification from './components/UI/Notification';
import { logout } from './services/auth';

function App() {

  const notification = useSelector(state => state.notification.notification);
  const notificationIsVisible = useSelector(state => state.notification.notificationIsVisible);

  const jwt = window.localStorage['jwt'];
  
  if(jwt){
    return(
      <div>
        {notificationIsVisible && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        <Router>
          <Navbar expand bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              Sprint App
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} to="/tasks">
                Tasks
              </Nav.Link>
              <Button style={{right: '10px', position: 'absolute'}} onClick={() => logout()}>Logout</Button>
            </Nav>
          </Navbar>

          <Container style={{paddingTop: '25px'}}>
            <Switch>
              {/* <Route render={() => <Redirect replace to="/tasks"/>} /> */}
              <Route exact path="/tasks" component={Tasks} />
              <Route exaxt path="/tasks/:id" component={EditTask} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </div>
    )
  } else {
    return(
      <Container>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exaxt path="/registration" component={Registration} />
            <Route render={() => <Redirect replace to="/login"/>} />
          </Switch>
        </Router>
      </Container>
    )
  }

}

export default App;
