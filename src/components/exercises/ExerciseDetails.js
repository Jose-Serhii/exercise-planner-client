import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ExerciseDetails(props) {
  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState({});
  const storedToken = localStorage.getItem('authToken');


  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setExercise(response.data);
      })
      .catch((e) => console.log("error getting exercise from API", e));
  }, []);

  const deleteExercise = () => {
    axios
      .delete(`http://localhost:5005/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/exercises");
      })
      .catch((e) => console.log("error deleting characters", e));
  };

  return (
    <div>
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
      <button onClick={deleteExercise}>delete this exercise</button>
      <Link to={`/exercises/edit/${exerciseId}`}>edit this exercise</Link>
    </div>
  );
}

export default ExerciseDetails;
