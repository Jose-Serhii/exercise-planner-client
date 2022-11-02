import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import { Col, Container, Row } from "react-bootstrap";

function ListOfExercises() {
  const [exercises, setExercises] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  let styles = {
    backgroundColor: "#FA6A36",
  };
  let stylesBtn = {
    border: "2px solid #FA6A36",
    color: "#FA6A36",
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/exercises`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="w-75 mt-3">
      <Link to={"/create-exercise"}>
        <img src="../plus.png" style={{ width: "50px" }} />
      </Link>
      <Card className="text-left mt-3 border-0" bg="dark">
        {exercises.map((exercise) => {
          console.log(exercise);
          return (
            <>
              <Card.Header
                style={styles}
                className="  border-0 text-light"
                key={exercise._id}
              ></Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col sm={4}>
                      <h2 className="text-light"> {exercise.title}</h2>
                    </Col>

                    <Col sm={4}></Col>
                    <Col>
                      <p className="text-light">
                        Category: <strong>{exercise.category}</strong>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4}>
                      <p className="text-light">
                        Type of exercise: <strong> {exercise.type} </strong>
                      </p>
                    </Col>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                      <p className="text-light">
                        Intensity: <strong>{exercise.intensity}</strong>
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="text-light">
                        Duration:{" "}
                        <strong>
                          {exercise.duration} {exercise.timeUnit}
                        </strong>
                      </p>
                    </Col>
                    <Col sm={4}></Col>
                    <Col>
                      <p className="text-light"></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col sm={4}></Col>
                    <Col>
                      <Link to={`/exercises/${exercise._id}`}>
                        <img style={{ width: "40px" }} src="../info.png" />
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </>
          );
        })}
      </Card>
    </Container>
  );
}

export default ListOfExercises;
