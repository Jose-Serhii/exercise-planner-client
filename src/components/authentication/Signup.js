import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Form,
  FormLabel,
  FormControl,
  FormText,
  FormGroup,
} from "react-bootstrap";

let bgStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
};

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container style={bgStyle} className="w-25 mb-5">
      <h3 className="mt-5 text-light">Sign Up</h3>

      <Form className="mb-3" onSubmit={handleSignupSubmit}>
        <FormGroup>
          <FormLabel className="mt-3 text-light">Email:</FormLabel>
          <FormControl
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <FormText className="text-white-50">
            Please provide valid email.
          </FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel className="mt-3 text-light">Password:</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <FormText className="text-white-50">
            Password must have at least 6 characters and contain at least one
            number, one lowercase and one uppercase letter.
          </FormText>
        </FormGroup>

        <FormLabel className="mt-3 text-light">Name:</FormLabel>
        <FormControl
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <Button className="mt-4" type="submit">
          Sign Up
        </Button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="text-light">Already have account?</p>
        <Link className="text-light" to={"/login"}>
          {" "}
          Login
        </Link>
      </Form>
    </Container>
  );
}

export default Signup;
