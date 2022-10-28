import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { Routes, Route, Navlink, Link } from "react-router-dom";
import ListOfExercises from "./components/exercises/ListOfExercises";
import ExerciseDetails from "./components/exercises/ExerciseDetails";
import CreateExercise from "./components/exercises/CreateExercise";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exercises" element={<ListOfExercises />} />
        <Route path="/exercises/:exerciseId" element={<ExerciseDetails />} />
        <Route path="/create-exercise" element={<CreateExercise />} />
      </Routes>
    </div>
  );
}

export default App;
