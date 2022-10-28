import React from "react";
import { Navlink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ListOfExercises() {
  const [exercises, setExercises] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzViYWUzZDU5YTc2NGUwYTVmZGFiZTAiLCJlbWFpbCI6InNlcmVnZXlrdmFzaGFAZ21haWwuY29tIiwibmFtZSI6ImFkbWluaXN0cmF0b3IiLCJpYXQiOjE2NjY5NTMxNTIsImV4cCI6MTY2Njk3NDc1Mn0.NpIDIVhaIVfi4ZhMQjJbZr1n7KhahBAZiZ8FpLnCwlc";

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/exercises", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

}

export default ListOfExercises;
