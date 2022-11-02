import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";

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
              >
                {exercise.title}
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-light">
                  <p> Category: {exercise.category}</p>
                </Card.Text>
                <Card.Text className="text-light">
                  Type: {exercise.type}
                </Card.Text>
                <Card.Text className="text-light">
                  Intensity: {exercise.intensity}
                </Card.Text>
                <Card.Text className="text-light">
                  {exercise.duration} {exercise.timeUnit}
                </Card.Text>
                <Link to={`/exercises/${exercise._id}`}>
                  <Button variant="light" style={stylesBtn}>
                    More Info
                  </Button>
                </Link>
              </Card.Body>
            </>
          );
        })}
      </Card>
    </Container>
  );
}

export default ListOfExercises;
