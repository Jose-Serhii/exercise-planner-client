import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import image from "./images/image.png";
let bgStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderRadius: "10px",
  marginTop: "200px",
};

function Homepage() {
  return (
    <Row>
      <Col>
        <img style={bgStyle} src={image} />
      </Col>
    </Row>
  );
}

export default Homepage;
