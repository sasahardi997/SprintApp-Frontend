import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, Link, Navigate } from 'react-router-dom';
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
        {notificationIsVisible &&
             <Notification status={notification.status} title={notification.title} message={notification.message} />}
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
            <Routes>
              <Route path="/" element={<Navigate replace to="/tasks" />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<EditTask />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </div>
    )
  } else {
    return(
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </Container>
    )
  }

}

export default App;
