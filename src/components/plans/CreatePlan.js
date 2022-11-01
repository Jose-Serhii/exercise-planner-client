import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Container,
  FormCheck,
  FormGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CreatePlan() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const [exercises, setExercises] = useState([]);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { day, date, activities, description };

    const storedToken = localStorage.getItem("authToken");

    // console.log(requestBody)

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/plans`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setDay("");
        setDate("");
        setActivities("");
        setDescription("");
        navigate("/plans");
      })
      .catch((error) => console.log(error));
  };

  const handleExercises = (e) => {
    const activitiesCopy = [...activities];

    if (e.target.checked) {
      if (!activitiesCopy.includes(e.target.value)) {
        activitiesCopy.push(e.target.value);
        setActivities(activitiesCopy);
      }
    }

    if (e.target.checked === false) {
      const test = activitiesCopy.filter(
        (activity) => activity !== e.target.value
      );
      setActivities(test);
    }
  };

  return (
    <>
      <Container className="w-50 mb-5">
        <Form onSubmit={handleSubmit} id="plansform">
          <FormLabel className="mt-5">Day:</FormLabel>
          <FormControl
            type="text"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <FormLabel className="mt-5">Date:</FormLabel>
          <FormControl
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <FormLabel className="mt-5">Activities:</FormLabel>

          {exercises.map((ex) => (
            <FormGroup
              className="mt-5"
              name="activities"
              value={activities}
              onChange={handleExercises}
            >
              <FormCheck
                multiple
                className="mt-5"
                id="custom-switch"
                type="switch"
                value={ex._id}
                label={ex.title}
              ></FormCheck>
            </FormGroup>
          ))}

          <FormLabel className="mt-5">Description:</FormLabel>
          <FormControl
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button variant="success" className="mt-4" type="submit">
            Create Plan
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreatePlan;
