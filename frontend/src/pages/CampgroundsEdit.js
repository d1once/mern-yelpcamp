import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CampgroundsEdit = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const [campground, setCampground] = useState({});
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchCampground = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/campgrounds/${id}`
      );
      setCampground(data);
      setTitle(data.title);
      setLocation(data.location);
    };
    fetchCampground();
  }, []);
  const editedCampground = {
    title,
    location,
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(editedCampground);
    axios.put(`http://localhost:5000/campgrounds/${id}`, editedCampground);
    history.push(`/campgrounds`);
  };
  return (
    <>
      <h1>Edit Campground</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Campground Title :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Campground Title"
            value={title}
            name={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location :</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Campground Location"
            value={location}
            name={title}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleEdit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CampgroundsEdit;
