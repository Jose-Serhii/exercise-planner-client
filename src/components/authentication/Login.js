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

let bgStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
};

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
    <Container style={bgStyle} className="w-25 mb-5">
      <h3 className="mt-5 text-light">Login</h3>

      <Form className="mb-3" onSubmit={handleLoginSubmit}>
        <FormGroup>
          <FormLabel className="mt-3 text-light">Email:</FormLabel>
          <FormControl
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="email@gmail.com"
          />
          <FormText className="text-white-50">
            Please provide your email.
          </FormText>
        </FormGroup>

        <FormGroup>
          <FormLabel className="mt-3 text-light">Password:</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="**********"
          />
          <FormText className="text-white-50">
            Please provide your password.
          </FormText>
        </FormGroup>

        <Button className="mt-2" type="submit">
          Login
        </Button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="mb-3 text-light">Don't have an account yet?</p>

        <Link className="text-light" to={"/signup"}>
          Sign Up
        </Link>
      </Form>
    </Container>
  );
}

export default Login;
