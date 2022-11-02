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
    FormCheck,
    FormGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EditPlan(props) {
    const storedToken = localStorage.getItem("authToken");

    const [day, setDay] = useState("");
    const [date, setDate] = useState("");
    const [activities, setActivities] = useState("");
    const [description, setDescription] = useState("");
    const [exercises, setExercises] = useState([]);

    const { planId } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const onePlan = response.data;
                setDay(onePlan.day);
                setDate(onePlan.date);
                setActivities(onePlan.activities);
                setDescription(onePlan.description);
            })
            .catch((error) => console.log(error));
    }, [planId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { day, date, activities, description };

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(
                `${process.env.REACT_APP_API_URL}/api/plans/${planId}`,
                requestBody,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                }
            )
            .then((response) => {
                navigate(`/plans/${planId}`);
            });
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

                    <FormLabel className="mt-5">Date:</FormLabel>
                    <FormControl
                        placeholder="DD-MM-YYYY"
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
                        rows={4}
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button variant="success" className="mt-4" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default EditPlan;
