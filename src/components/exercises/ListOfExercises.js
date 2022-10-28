import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

function ListOfExercises() {
  const [exercises, setExercises] = useState([]);

  const getListOfExercises = () => {
    useEffect(() => {
      axios
        .get("http://localhost:5005/api/exercises")
        .then((response) => setExercises(response.data));
      console.log(response.data).catch((err) => console.log(err));
    });
    useEffect(() => {
      getListOfExercises();
    }, []);
  };

  return (
    <div>
      {exercises.map((exercise) => {
        console.log(exercise);
        return (
          <div key={exercise._id}>
            <h3>{exercise.title}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfExercises;
