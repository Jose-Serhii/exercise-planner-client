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
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

let bgStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
};


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
      <Container style={bgStyle} className="mt-5 w-50 mb-5 text-light">
        <Form onSubmit={handleSubmit} id="plansform">
          <FormLabel className="mt-5">Day</FormLabel>
          <FormSelect
            type="text"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option hidden>choose a day...</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </FormSelect>

          <FormLabel className="mt-5">Date</FormLabel>
          <FormControl
            placeholder="DD-MM-YYYY"
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <FormLabel className="mt-5">Activities</FormLabel>
          <Row><Col>


            {exercises.map((ex) => (
              <FormGroup
                className="mt-2"
                name="activities"
                value={activities}
                onChange={handleExercises}
              >
                <FormCheck
                  inline={true}
                  multiple
                  className="mt-3"
                  id="custom-switch"
                  type="switch"
                  value={ex._id}
                  label={ex.title}
                ></FormCheck>
              </FormGroup>

            ))}
          </Col>
            <Col></Col>
            <Col></Col>
          </Row>

          <FormLabel className="mt-5">Description</FormLabel>
          <FormControl
            type="text"
            as="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}

          />

          <Button variant="outline-success" className="mt-4 mb-3 text-light" type="submit">
            Create Plan
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreatePlan;
