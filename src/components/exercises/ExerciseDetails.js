import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

let styles = {
  backgroundColor: "#FA6A36",
};

function ExerciseDetails(props) {
  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState({});
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setExercise(response.data);
      })
      .catch((e) => console.log("error getting exercise from API", e));
  }, []);

  const deleteExercise = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/exercises");
      })
      .catch((e) => console.log("error deleting characters", e));
  };

  return (
    <Container className="w-50 mt-5 mb-5">
      <Card className="text-left mt-3 border-0 bg-opacity-75" bg="dark">
        <Card.Header
          style={styles}
          className="  border-0"
          key={exercise._id}
        ></Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col sm={12}>
                <h2 className="text-light mb-5">{exercise.title}</h2>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col>
                <p className="text-light">
                  Category:
                  <strong style={{ fontSize: "1.5em" }}>
                    {" "}
                    {exercise.category}
                  </strong>
                </p>
              </Col>
              <Col></Col>
              <Col>
                <p className="text-light">
                  Type of exercise:{" "}
                  <strong style={{ fontSize: "1.5em" }}>{exercise.type}</strong>
                </p>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <p className="text-light">
                  Intensity:{" "}
                  <strong style={{ fontSize: "1.5em" }}>
                    {exercise.intensity}
                  </strong>
                </p>
              </Col>
              <Col></Col>
              <Col>
                <p className="text-light">
                  Target muscle:
                  <strong style={{ fontSize: "1.5em" }}>
                    {" "}
                    {exercise.muscle}
                  </strong>
                </p>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <p className="text-light">
                  Specific area:{" "}
                  <strong style={{ fontSize: "1.5em" }}>
                    {exercise.specificArea}
                  </strong>
                </p>
              </Col>
              <Col></Col>
              <Col>
                <p className="text-light">
                  Duration:{" "}
                  <strong style={{ fontSize: "1.5em" }}>
                    {exercise.duration} {exercise.timeUnit}
                  </strong>
                </p>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col sm={12}>
                <p className="text-light mt-5">
                  <i style={{ fontSize: "1.5em" }}>{exercise.description}</i>
                </p>
              </Col>
            </Row>
            <Button className="text-light mt-4 mb-3" variant="outline-danger" onClick={deleteExercise}>
              Delete
            </Button>
            {'  '}
            <Button
              className="mt-4 mb-3 text-light"
              style={{ textDecoration: "none" }}
              href={`/exercises/edit/${exerciseId}`}
              variant="outline-primary"
            >Edit
            </Button>
          </Container>
        </Card.Body>
      </Card>
      <Container className="w-50 mt-3 ">

      </Container>
    </Container>
  );
}

export default ExerciseDetails;
