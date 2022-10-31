import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <>
      <Container className="w-50 mb-5">
        <Form onSubmit={handleFormSubmit} id="exform">
          <FormLabel className="mt-5">Title:</FormLabel>
          <FormControl
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FormLabel className="mt-3">Category:</FormLabel>
          <FormControl
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <FormLabel className="mt-3">Choose a type:</FormLabel>
          <FormSelect
            type="text"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option hidden>choose the type...</option>
            <option>Cardio</option>
            <option>Strength</option>
            <option>Balance</option>
            <option>Flexibility</option>
            <option>Coordination</option>
            <option>Warm-up</option>
            <option>Other</option>
          </FormSelect>

          <FormLabel className="mt-3">Intensity:</FormLabel>
          <FormSelect
            type="text"
            name="intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          >
            <option hidden>choose intensity...</option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </FormSelect>

          <FormLabel className="mt-3">Target muscle:</FormLabel>
          <FormSelect
            type="text"
            name="muscle"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
          >
            <option hidden>choose muscle...</option>
            <option>Chest</option>
            <option>Back</option>
            <option>Arms</option>
            <option>Abdominals</option>
            <option>Legs</option>
            <option>Shoulders</option>
            <option>Other</option>
          </FormSelect>

          <FormLabel className="mt-3">Specific Area:</FormLabel>
          <FormControl
            type="text"
            name="specificArea"
            value={specificArea}
            onChange={(e) => setSpecificArea(e.target.value)}
          />

          <FormLabel className="mt-3">Duration:</FormLabel>
          <FormControl
            type="text"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <FormLabel className="mt-3">Time Unit:</FormLabel>
          <FormSelect
            type="text"
            name="timeUnit"
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
          >
            <option hidden>time unit</option>
            <option>Minutes</option>
            <option>Hours</option>
          </FormSelect>

          <FormLabel className="mt-3">Image:</FormLabel>
          <FormControl
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <FormLabel className="mt-3">Description:</FormLabel>
          <FormControl
            as="textarea"
            rows={4}
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button className="mt-4" type="submit" variant="success">
            Save Changes
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditExercise;
