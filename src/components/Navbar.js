import React from "react";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import "./styling/Navbar.css"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


let styles = {

  color: "#FA6A36",

}

function Navigation() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);






  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={styles} href="/">
          Homepage
        </Navbar.Brand>

        <Navbar.Collapse id="responsive-navbar-nav">
          {!isLoggedIn && (
            <>
              <Nav className="me-auto">
                <Nav.Link href="/login"><Button style={styles} variant="outline">Login</Button></Nav.Link>
                <Nav.Link href="/signup"><Button style={styles} variant="outline">Signup</Button></Nav.Link>
              </Nav>
            </>
          )}

          {isLoggedIn && (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Button style={styles} variant="outline" onClick={logOutUser} href="/">Logout</Button>
              <span>{user && user.name}</span>
              <Nav>
                <Nav.Link href="/exercises"><Button style={styles} variant="outline">Exercises</Button></Nav.Link>
                <Nav.Link eventKey={2} href="/plans"><Button style={styles} variant="outline">Plans</Button></Nav.Link>

              </Nav>
            </>)}



        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
