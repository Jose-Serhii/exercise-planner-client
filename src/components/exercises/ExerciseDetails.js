import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ExerciseDetails(props) {
  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState({});
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzViYWUzZDU5YTc2NGUwYTVmZGFiZTAiLCJlbWFpbCI6InNlcmVnZXlrdmFzaGFAZ21haWwuY29tIiwibmFtZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE2NjY5NzExMTMsImV4cCI6MTY2Njk5MjcxM30.fi2NpJEZ9-7hbaS-goTNGBqZCkMbkPY9QXxKigoY9jU";

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setExercise(response.data);
      })
      .catch((e) => console.log("error getting exercise from API", e));
  }, []);

  const deleteExercise = () => {
    axios
      .delete(`http://localhost:5005/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${token}` },
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
      <button onClick={deleteExercise}>DELETE THIS exercise</button>
    </div>
  );
}

export default ExerciseDetails;
