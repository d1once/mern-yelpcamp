import axios from "axios";
import { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CampgroundsNew = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const history = useHistory();

  const campground = {
    title,
    location,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/campgrounds", { campground });
    setTitle("");
    setLocation("");
    history.push("/campgrounds");
  };

  return (
    <Container>
      <Row>
        <h1 className="text-center">New Campground</h1>
        <Col md={6} className="mx-auto">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Campground Title :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Campground Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Location :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Campground Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Image :</Form.Label>
              <Form.Control type="text" placeholder="Enter Campground Image" />
            </Form.Group>
            <div className="mb-3">
              <Form.Label>Price :</Form.Label>
              <InputGroup>
                <InputGroup.Text id="price">$</InputGroup.Text>
                <FormControl
                  placeholder="Price"
                  aria-label="Price"
                  aria-describedby="price"
                />
              </InputGroup>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Description :</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a description here"
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              className="mb-3"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CampgroundsNew;
