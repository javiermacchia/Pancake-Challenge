import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import * as serviceWorker from './serviceWorker';
import Create from './components/Create'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Read from './components/Read'
import App from './App'

ReactDOM.render(
  
  <>
      <Router>
<Navbar bg="light" expand="lg">
  <Container>

    <Navbar.Brand href="/">Pancake</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/Notes/Create">New Note</Nav.Link>
        <Nav.Link href="/Notes">All Notes</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Routes>
                 { <Route exact path='/' element={< App />}></Route> }
                 <Route exact path='/Notes/Create' element={< Create />}></Route>
                 <Route exact path='/Notes' element={< Read />}></Route>
          </Routes>
          </Router>
  </>,
  document.getElementById('root')
);
serviceWorker.unregister();
