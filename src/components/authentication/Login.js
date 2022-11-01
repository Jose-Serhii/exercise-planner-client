import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container className="w-25 mb-5">
      <h3 className="mt-5">Login</h3>

      <Form onSubmit={handleLoginSubmit}>
        <FormGroup>
          <FormLabel className="mt-5">Email:</FormLabel>
          <FormControl
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <FormText className="text-muted">Please provide your email.</FormText>
        </FormGroup>

        <FormGroup>
          <FormLabel className="mt-3">Password:</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <FormText className="text-muted">
            Please provide your password.
          </FormText>
        </FormGroup>

        <Button className="mt-4" type="submit">
          Login
        </Button>
      </Form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </Container>
  );
}

export default Login;
