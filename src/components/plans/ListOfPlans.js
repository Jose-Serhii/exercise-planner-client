import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ListOfPlans() {
    const [plans, setPlans] = useState([]);
    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get("http://localhost:5005/api/plans", {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {

                setPlans(response.data);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log(plans)
    return (
        <div className="main-container">
            {plans.length !== 0 && plans.map((plan) => {
                return (
                    <Link to={`/plans/${plan._id}`}>
                        <div key={plan._id} className="card">
                            <div className="container">
                                <h3>{plan.day}</h3>
                                <h3>{plan.date}</h3>
                                <h3>{plan.activities.map((activity) =>
                                    <p>{activity.title}</p>
                                )}</h3>
                                <h3>{plan.description}</h3>

                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ListOfPlans;