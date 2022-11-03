import "./App.css";
import Navigation from "./components/Navbar";
import Homepage from "./components/Homepage";
import { Routes, Route, Navlink, Link } from "react-router-dom";
import ListOfExercises from "./components/exercises/ListOfExercises";
import ExerciseDetails from "./components/exercises/ExerciseDetails";
import CreateExercise from "./components/exercises/CreateExercise";
import EditExercise from "./components/exercises/EditExercise";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import CreatePlan from "./components/plans/CreatePlan";
import ListOfPlans from "./components/plans/ListOfPlans";
import PlanDetails from "./components/plans/PlanDetails";
import EditPlan from "./components/plans/EditPlan";
import { AuthContext } from "./context/auth.context";
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/exercises" element={<isPrivate><ListOfExercises /></isPrivate>} />
        <Route path="/exercises/:exerciseId" element={<IsPrivate><ExerciseDetails /></IsPrivate>} />
        <Route path="/create-exercise" element={<IsPrivate><CreateExercise /></IsPrivate>} />
        <Route path="/exercises/edit/:exerciseId" element={<IsPrivate><EditExercise /></IsPrivate>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<IsPrivate><ListOfPlans /></IsPrivate>} />
        <Route path="/create-plan" element={<IsPrivate><CreatePlan /></IsPrivate>} />
        <Route path="/plans/:planId" element={<IsPrivate><PlanDetails /></IsPrivate>} />
        <Route path="/plans/edit/:planId" element={<IsPrivate><EditPlan /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
