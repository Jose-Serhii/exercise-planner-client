import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditExercise(props) {
  const storedToken = localStorage.getItem("authToken");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [muscle, setMuscle] = useState("");
  const [specificArea, setSpecificArea] = useState("");
  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const { exerciseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneExercise = response.data;
        setTitle(oneExercise.title);
        setCategory(oneExercise.category);
        setType(oneExercise.type);
        setIntensity(oneExercise.intensity);
        setMuscle(oneExercise.muscle);
        setSpecificArea(oneExercise.specificArea);
        setDuration(oneExercise.duration);
        setTimeUnit(oneExercise.timeUnit);
        setImageUrl(oneExercise.imageUrl);
        setDescription(oneExercise.description);
      })
      .catch((error) => console.log(error));
  }, [exerciseId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      category,
      type,
      intensity,
      muscle,
      specificArea,
      duration,
      timeUnit,
      imageUrl,
      description,
    };

    axios
      .put(`${API_URL}/api/exercises/${exerciseId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/exercises/${exerciseId}`);
      });
  };

  return (
    <div className="EditExercisePage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit} id="exform">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Choose a type:</label>
        <select
          type="text"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Cardio</option>
          <option>Strength</option>
          <option>Balance</option>
          <option>Flexibility</option>
          <option>Coordination</option>
          <option>Warm - up</option>
          <option>Other</option>
        </select>

        <label>Intensity:</label>
        <select
          type="text"
          name="intensity"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        >
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>

        <label>Target muscle:</label>
        <select
          type="text"
          name="muscle"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
        >
          <option>Chest</option>
          <option>Back</option>
          <option>Arms</option>
          <option>Abdominals</option>
          <option>Legs</option>
          <option>Shoulders</option>
          <option>Other</option>
        </select>

        <label>Specific Area:</label>
        <input
          type="text"
          name="specificArea"
          value={specificArea}
          onChange={(e) => setSpecificArea(e.target.value)}
        />

        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label>Time Unit:</label>
        <select
          type="text"
          name="timeUnit"
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
        >
          <option>Minutes</option>
          <option>Hours</option>
        </select>

        <label>Image:</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditExercise;
