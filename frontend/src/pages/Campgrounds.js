import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Row, Col, Image, Button } from "react-bootstrap";

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  useEffect(() => {
    const fetchCampgrounds = async () => {
      const { data } = await axios.get("http://localhost:5000/campgrounds");
      setCampgrounds(data);
    };
    fetchCampgrounds();
  }, [campgrounds]);
  return (
    <div>
      {campgrounds.map((campground) => (
        <Card key={campground._id}>
          <Row>
            <Col md={4}>
              <Image src={campground.image} alt={campground.title} fluid />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{campground.title}</Card.Title>
                <Card.Text>{campground.description}</Card.Text>
                <Card.Subtitle className="text-muted my-3">
                  {campground.location}
                </Card.Subtitle>
                <Link
                  to={`/campgrounds/${campground._id}`}
                  className="btn btn-primary"
                >
                  View {campground.title}
                </Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default Campgrounds;
