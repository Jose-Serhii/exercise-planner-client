import { useState, } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const API_URL = "http://localhost:5005";


function CreatePlan() {
    const navigate = useNavigate();

    const [day, setDay] = useState("");
    const [date, setDate] = useState("");
    const [activities, setActivities] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { day, date, activities, description }

        const storedToken = localStorage.getItem('authToken');


        axios
            .post(
                `${API_URL}/api/plans`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {

                setDay("")
                setDate("")
                setActivities("")
                setDescription("")
                navigate("/plans")

            })
            .catch((error) => console.log(error));
    };



    return (
        <>
            <div>
                <form onSubmit={handleSubmit} id="plansform">
                    <label>Day:</label>
                    <input
                        type="text" name="day" value={day} onChange={(e) => setDay(e.target.value)} />

                    <label>Date:</label>
                    <input
                        type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    <label>Activities:</label>
                    <input
                        type="text" name="activities" value={activities} onChange={(e) => setActivities(e.target.value)} />

                    <label>Description:</label>
                    <input
                        type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <button type="submit">Create Plan</button>

                </form>

            </div>
        </>
    )
}

export default CreatePlan;