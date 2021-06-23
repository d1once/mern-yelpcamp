import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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
    <div>
      <h1>{campground?.title}</h1>
      <h2>{campground?.location}</h2>
      <Link to={`/campgrounds/${campground?._id}/edit`}>Edit Campground</Link>
      <Form>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default CampgroundShow;
