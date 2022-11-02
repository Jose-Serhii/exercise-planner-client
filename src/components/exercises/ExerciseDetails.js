import axios from "axios";
import { Component, useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ExerciseDetails(props) {
  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState({});
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
    <Container className="w-75 mt-3">
      <Card className="text-left mt-3 border-0 bg-opacity-75" bg="dark">
        <Card.Header
          style={styles}
          className="  border-0"
          key={exercise._id}
        ></Card.Header>
        <Card.Body>
          <h3>{exercise.title}</h3>
          <h3>{exercise.category}</h3>
          <h3>{exercise.type}</h3>
          <h3>{exercise.intensity}</h3>
          <h3>{exercise.muscle}</h3>
          <h3>{exercise.specificArea}</h3>
          <h3>{exercise.duration}</h3>
          <h3>{exercise.timeUnit}</h3>
          <h3>{exercise.imageUrl}</h3>
          <h3>{exercise.description}</h3>
        </Card.Body>
        <Button variant="danger" onClick={deleteExercise}>
          Delete
        </Button>
        <Link className="text.secondary" to={`/exercises/edit/${exerciseId}`}>
          edit this exercise
        </Link>
      </Card>
    </Container>
  );
}

export default ExerciseDetails;
