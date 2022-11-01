import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";

function CreatePlan() {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState("");
  const [description, setDescription] = useState("");
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/exercises`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setExercises(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { day, date, activities, description };
    console.log(requestBody);

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

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} id="plansform">
          <label>Day:</label>
          <input
            type="text"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />

          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Activities:</label>
          <select
            multiple
            type="text"
            name="activities"
            onChange={(e) => setActivities((prev) => [...prev, e.target.value])}
          >
            {exercises.map((exercises) => (
              <option value={exercises._id}>{exercises.title}</option>
            ))}
          </select>

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Create Plan</button>
        </form>
      </div>
    </>
  );
}

export default CreatePlan;
