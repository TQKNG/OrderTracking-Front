import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { House, UpcScan, EnvelopeAt} from 'react-bootstrap-icons';

const NavbarComp = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Order Tracking App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content" style={{width:"70%"}}>
            <Nav.Link  href="/"><House className="m-1"/> Home</Nav.Link>
            <Nav.Link href="orders"><UpcScan className="m-1"/>My Order</Nav.Link>
            <Nav.Link href="contact"><EnvelopeAt className="m-1"/>Contact Form</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavbarComp