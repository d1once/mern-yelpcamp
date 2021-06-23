import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Campground Title :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Campground Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Location :</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Campground Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default CampgroundsNew;
