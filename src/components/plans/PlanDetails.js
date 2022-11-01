import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PlanDetails(props) {
  const { planId } = useParams();

  const navigate = useNavigate();

  const [plan, setPlan] = useState({});
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPlan(response.data);
      })
      .catch((e) => console.log("error getting plan from API", e));
  }, []);

  const deletePlan = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/plans");
      })
      .catch((e) => console.log("error deleting characters", e));
  };

  return (
    <div>
      <h3>{plan.day}</h3>
      <h3>{plan.date}</h3>
      <h3>{plan.activities}</h3>
      <h3>{plan.description}</h3>
      <button onClick={deletePlan}>delete this plan</button>
      <Link to={`/plans/edit/${planId}`}>edit this plan</Link>
    </div>
  );
}

export default PlanDetails;
