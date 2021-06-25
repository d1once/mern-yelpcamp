import { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Container,
  InputGroup,
} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

const CampgroundsEdit = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const [campgrounds, setCampgrounds] = useState({});
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchCampground = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/campgrounds/${id}`
      );
      setCampgrounds(data);
      setTitle(data.title);
      setImage(data.image);
      setPrice(data.price);
      setDescription(data.description);
      setLocation(data.location);
    };
    fetchCampground();
  }, []);
  const campground = {
    title,
    location,
    image,
    price,
    description,
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(campground);
    await axios.put(`http://localhost:5000/campgrounds/${id}`, {
      campground,
    });
    history.push(`/campgrounds/${id}`);
  };
  return (
    <Container>
      <Row>
        <h1 className="text-center">Edit Campground</h1>
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
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Campground Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Form.Label>Price :</Form.Label>
              <InputGroup>
                <InputGroup.Text id="price">$</InputGroup.Text>
                <FormControl
                  placeholder="Price"
                  aria-label="Price"
                  aria-describedby="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Description :</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Update your description here"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mb-3"
              onClick={handleEdit}
            >
              Submit
            </Button>
          </Form>
          <Link to={`/campgrounds/${id}`}>Back to Campground</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CampgroundsEdit;
