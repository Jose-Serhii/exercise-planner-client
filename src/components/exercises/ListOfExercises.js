import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";

function ListOfExercises() {
  const [exercises, setExercises] = useState([]);
  const storedToken = localStorage.getItem("authToken");

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
    <Card className="text-left" as="h5">
      {exercises.map((exercise) => {
        console.log(exercise);
        return (
          <>
            <div />
            <Stack gap={3}>
              <Card.Header className="cardCustom" key={exercise._id}>
                {exercise.title}
              </Card.Header>
              <Card.Body className="cardBody">
                <Card.Title className="cardCustom">
                  Category: {exercise.category}
                </Card.Title>
                <Card.Text className="cardCustom">
                  Type: {exercise.type}
                </Card.Text>
                <Card.Text className="cardCustom">
                  Intensity: {exercise.intensity}
                </Card.Text>
                <Card.Text className="cardCustom">
                  {exercise.duration} {exercise.timeUnit}
                </Card.Text>
                <Link to={`/exercises/${exercise._id}`}>
                  <Button variant="primary">More Info</Button>
                </Link>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Stack>
          </>
        );
      })}
    </Card>
  );
}

export default ListOfExercises;
