import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ListOfExercises() {
  const [exercises, setExercises] = useState();

  const getListOfExercises = () => {
    useEffect(() => {
      axios
        .get("http://localhost:5005/api/exercises")
        .then((response) => setExercises(response.data))
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    getListOfExercises();
  }, []);

  return <div>This os a list of exercises</div>;
}

export default ListOfExercises;
