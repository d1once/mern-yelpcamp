import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  useEffect(() => {
    const fetchCampgrounds = async () => {
      const { data } = await axios.get("http://localhost:5000/campgrounds");
      setCampgrounds(data);
    };
    fetchCampgrounds();
  }, []);
  return (
    <div>
      {campgrounds.map((campground) => (
        <div key={campground._id}>
          <h3>{campground.title}</h3>
          <h6>{campground.location}</h6>
          <Link to={`/campgrounds/${campground._id}`}>View Campground</Link>
        </div>
      ))}
    </div>
  );
};

export default Campgrounds;
