import { useState } from "react";
import { useNavigate } from "react-router-dom";
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


let bgStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
};




function CreateExercise(props) {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
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

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/exercises`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setCategory("");
        setType("");
        setIntensity("");
        setMuscle("");
        setSpecificArea("");
        setDuration("");
        setTimeUnit("");
        setImageUrl("");
        setDescription("");
        navigate("/exercises");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container style={bgStyle} className="w-50 mt-5 mb-5">
      <Form onSubmit={handleSubmit} id="exform">
        <FormLabel className="mt-5 text-light">Title*:</FormLabel>
        <FormControl
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormLabel className="mt-3 text-light">Category*:</FormLabel>
        <FormControl
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <FormLabel className="mt-3 text-light">Choose a type*:</FormLabel>
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

        <FormLabel className="mt-3 text-light">Intensity*:</FormLabel>
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

        <FormLabel className="mt-3 text-light">Target muscle*:</FormLabel>
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

        <FormLabel className="mt-3 text-light">Specific Area:</FormLabel>
        <FormControl
          type="text"
          name="specificArea"
          value={specificArea}
          onChange={(e) => setSpecificArea(e.target.value)}
        />

        <FormLabel className="mt-3 text-light">Duration:</FormLabel>
        <FormControl
          type="text"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <FormLabel className="mt-3 text-light">Time Unit:</FormLabel>
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

        <FormLabel className="mt-3 text-light">Image:</FormLabel>
        <FormControl
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <FormLabel className="mt-3 text-light">Description:</FormLabel>
        <FormControl
          as="textarea"
          rows={4}
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button className="mt-4 mb-3 text-light" type="submit" variant="outline-success">
          Add Exercise
        </Button>
      </Form>
    </Container>
  );
}

export default CreateExercise;
