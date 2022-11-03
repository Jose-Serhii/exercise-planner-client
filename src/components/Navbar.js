import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./styling/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Row, Col } from "react-bootstrap";
import imagelogo from "../home.png"
import imagelogo2 from "../logout.png"
import imagelogo3 from "../login.png"

let styles = {
  color: "#FA6A36",
};
let bgStyle = {
  backgroundColor: "#161D21",
};

function Navigation() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar className="align-content-start" style={bgStyle}>
      <Row className="align-content-start w-100 ">
        <Col sm={4}>
          <Navbar.Brand style={styles} href="/">
            <img src={imagelogo} style={{ width: "150px" }} />
          </Navbar.Brand>
        </Col>
        <Col sm={5}></Col>
        <Col sm={3} className="mt-3">
          <Navbar.Collapse id="responsive-navbar-nav">
            {!isLoggedIn && (
              <Nav className="me-auto">
                <Nav.Link href="/signup">
                  <Button className="mt-3" style={styles} variant="outline">
                    Signup
                  </Button>
                </Nav.Link>
                <Nav.Link href="/login">
                  <Button style={styles} className="ms-5" variant="outline">
                    <img style={{ width: "30px" }} src={imagelogo3} />
                    <br></br>
                    Login
                  </Button>
                </Nav.Link>
              </Nav>
            )}

            {isLoggedIn && (
              <>
                <Nav>
                  <Nav.Link href="/exercises">
                    <Button
                      style={styles}
                      className=" me-3 fs-3"
                      variant="outline"
                    >
                      Exercises
                    </Button>
                  </Nav.Link>
                  <Nav.Link eventKey={2} href="/plans">
                    <Button
                      style={styles}
                      className=" me-3 fs-3"
                      variant="outline"
                    >
                      Plans
                    </Button>
                  </Nav.Link>
                  <Nav.Link>
                    <Button
                      style={styles}
                      variant="outline"
                      onClick={logOutUser}
                      href="/"
                    >
                      <img to="/" style={{ width: "30px" }} src={imagelogo2} />
                      <br></br>
                      Logout
                    </Button>
                  </Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Col>
      </Row>
    </Navbar>
  );
}

export default Navigation;
