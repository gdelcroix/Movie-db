import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return <>
     <Navbar expand="lg" className="fixed-top bg-body-tertiary">
      <Container>
        <Navbar.Brand><Link to={'/'}>Home</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Link to={'/genres'} className='ms-3'>Genres</Link>
              <Link to={'/people'} className='ms-3'>Acteurs</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>;
}
 
export default NavBar;