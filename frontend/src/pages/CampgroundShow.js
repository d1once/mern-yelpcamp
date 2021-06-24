import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const CampgroundShow = ({ match }) => {
  const history = useHistory();
  const id = match.params.id;
  const [campground, setCampground] = useState({});
  useEffect(() => {
    const fetchCampground = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/campgrounds/${id}`
      );
      setCampground(data);
    };
    fetchCampground();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/campgrounds/${id}`);
    history.push("/campgrounds");
  };
  return (
    <>
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="mb-5">
            <Card.Img variant="top" src={campground.image} />
            <Card.Body>
              <Card.Title>{campground.title}</Card.Title>
              <Card.Text>{campground.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem className="text-muted">
                {campground.location}
              </ListGroupItem>
              <ListGroupItem>${campground.price}/night</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Link
                to={`/campgrounds/${campground._id}/edit`}
                className="btn btn-info mx-3"
              >
                Edit
              </Link>
              <Form className="d-inline">
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CampgroundShow;
