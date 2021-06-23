const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/mern-yelpcamp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home");
});
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
});

app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
});

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.json(campground);
});

app.put("/campgrounds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.send(campground);
    console.log(campground);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/campgrounds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCampground = await Campground.findByIdAndDelete(id);
    if (!deletedCampground) {
      res.status(400);
    }
    res.status(200);
  } catch (error) {
    res.status(400);
  }
});

app.listen(5000, () => {
  console.log("Serving on port 5000");
});
