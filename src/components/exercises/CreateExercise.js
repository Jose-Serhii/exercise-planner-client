
import { useState, } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const API_URL = "http://localhost:5005";



function CreateExercise(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [muscle, setMuscle] = useState("");
  const [specificArea, setSpecificArea] = useState("");
  const [duration, setDuration] = useState("");
  const [timeUnit, setTimeUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, category, type, intensity, muscle, specificArea, duration, timeUnit, imageUrl, description };

    const storedToken = localStorage.getItem('authToken');


    axios
      .post(
        `${API_URL}/api/exercises`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {

        setTitle("");
        setCategory("");
        setType("");
        setIntensity("");
        setMuscle("");
        setSpecificArea("");
        setDuration("");
        setTimeUnit("");
        setImageUrl("");
        setDescription("");
        navigate("/exercises");


      })
      .catch((error) => console.log(error));
  };







  return (
    <>
      <div>
        <form onSubmit={handleSubmit} id="exform">
          <label>Title:</label>
          <input
            type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>category:</label>
          <input
            type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />

          <label>Choose a type:</label>
          <input
            type="text" name="type" value={type} onChange={(e) => setType(e.target.value)} />

          <label>Intensity:</label>
          <input
            type="text" name="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} />

          <label>muscle:</label>
          <input
            type="text" name="muscle" value={muscle} onChange={(e) => setMuscle(e.target.value)} />

          <label>specificArea:</label>
          <input
            type="text" name="specificArea" value={specificArea} onChange={(e) => setSpecificArea(e.target.value)} />

          <label>duration:</label>
          <input
            type="text" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

          <label>timeUnit:</label>
          <input
            type="text" name="timeUnit" value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)} />

          <label>Image:</label>
          <input
            type="text" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

          <label>Description:</label>
          <input
            type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <button type="submit">Create Exercise</button>


        </form>

      </div>
    </>
  );
}

export default CreateExercise;
