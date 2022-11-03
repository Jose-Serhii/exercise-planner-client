import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

let styles = {
  backgroundColor: "#FA6A36",
};
let bgStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
};

function PlanDetails(props) {
  const { planId } = useParams();

  const navigate = useNavigate();

  const [plan, setPlan] = useState({});
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setPlan(response.data);
      })
      .catch((e) => console.log("error getting plan from API", e));
  }, []);

  const deletePlan = () => {
    console.log(planId);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/plans/${planId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/plans");
      })
      .catch((e) => console.log("error deleting characters", e));
  };

  return (
    <Container className="w-50 mb-5 text-light">
      <Card style={bgStyle} >
        <Card.Header
          style={styles}
          className="border-0"
        ></Card.Header>

        <Card.Body className="text-light">
          <Container>
            <Row>
              <Col>
                <h3>{plan.day}</h3></Col>
              <Col></Col>
              <Col><h3>{plan.date}</h3></Col>
            </Row>
          </Container>

          <Col></Col>
          <Container>
            <Row>
              <Col>

                <h3 className="mt-5">
                  <h6>Activities</h6>
                  {plan.activities?.map((ex) => (
                    <p>{ex.title}</p>
                  ))}
                </h3>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Container>
          <Container className="mt-5 mb-4 text-left">
            <Row><Col><i style={{ fontSize: "1.5em" }} className="mt-5">{plan.description}</i></Col>
              <Col></Col>
            </Row>
          </Container>

          <Button variant="outline-danger" className="mt-4 mb-3 text-light" onClick={deletePlan}>delete this plan</Button>{' '}
          <Button variant="outline-primary" className="mt-4 mb-3 text-light" href={`/plans/edit/${planId}`}>edit this plan</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PlanDetails;
