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



function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exercises" element={<ListOfExercises AuthContext={AuthContext} />} />
        <Route path="/exercises/:exerciseId" element={<ExerciseDetails />} />
        <Route path="/create-exercise" element={<CreateExercise />} />
        <Route path="/exercises/edit/:exerciseId" element={<EditExercise />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plans" element={<ListOfPlans />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/plans/:planId" element={<PlanDetails />} />
        <Route path="/plans/edit/:planId" element={<EditPlan />} />
      </Routes>
    </div>
  );
}

export default App;
