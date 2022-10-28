import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ListOfExercises() {
  const [exercises, setExercises] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5005/api/exercises")
      .then((response) => setExercises(response.data))
      .catch((err) => console.log(err));
  });



  return <div>
    {exercises.map((exercises) => (
      <div><h2>{exercises.type}</h2></div>
    ))}


  </div>;

}

export default ListOfExercises;
