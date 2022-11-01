import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditPlan(props) {

    const storedToken = localStorage.getItem('authToken');



    const [day, setDay] = useState("");
    const [date, setDate] = useState("");
    const [activities, setActivities] = useState("");
    const [description, setDescription] = useState("");



    const { planId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5005/api/plans/${planId}`, {
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




    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { day, date, activities, description };

        axios
            .put(`${API_URL}/api/plans/${planId}`, requestBody, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                navigate(`/plans/${planId}`)
            });
    };



    return (
        <div className="EditPlanPage">
            <h3>Edit the Plan</h3>

            <form onSubmit={handleFormSubmit} id="exform">
                <label>Day:</label>
                <input
                    type="text" name="day" value={day} onChange={(e) => setDay(e.target.value)} />

                <label>Date:</label>
                <input
                    type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <label>Choose an activity:</label>
                <input
                    type="text" name="activities" value={activities} onChange={(e) => setActivities(e.target.value)} />

                <label>Description:</label>
                <input
                    type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />



                <button type="submit">Edit Plan</button>
            </form>

        </div>
    );
}

export default EditPlan;
