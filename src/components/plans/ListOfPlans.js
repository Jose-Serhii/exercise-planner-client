import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import { Col, Container, Row } from "react-bootstrap";

let styles = {
  backgroundColor: "#FA6A36",
};
let stylesBtn = {
  border: "2px solid #FA6A36",
  color: "#FA6A36",
};

function ListOfPlans() {
  const [plans, setPlans] = useState([]);
  const storedToken = localStorage.getItem("authToken");


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPlans(response.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <Container className="w-75 mt-3 mb-5">
      <Link to={"/create-plan"}>
        <img src="../plus.png" style={{ width: "50px" }} />
      </Link>
      <Card className="text-left mt-3 border-0 bg-opacity-75 position-relative" bg="dark">
        {plans.length !== 0 &&
          plans.map((plan) => {
            return (
              <Link style={{ textDecoration: 'none' }} to={`/plans/${plan._id}`}>
                <Card.Header
                  style={styles}
                  className="border-0 text-light"
                  key={plan._id}>
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col sm={4}>
                        <h3 className="text-light " >{plan.day}</h3>
                      </Col>
                      <Col sm={4}></Col>
                      <Col sm={4}>
                        <h6 className="text-light">{plan.date}</h6>
                      </Col>

                      <Col sm={4}></Col>
                      <Col sm={12} >

                        <p className="text-center text-light mt-5"><h4>Activities</h4></p>
                        <Container  >
                          {plan.activities.map((activity) => (
                            <Row >
                              <Col style={{ color: "white" }} className="mt-4">{activity.title}</Col>
                              <Col style={{ color: "white" }} className="mt-4"> {activity.intensity}</Col>
                              <Col style={{ color: "white" }} className="mt-4">{activity.duration} {activity.timeUnit}</Col>
                            </Row>
                          ))}
                        </Container>

                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Link>
            );
          })}
      </Card>
    </Container >
  );
}

export default ListOfPlans;
