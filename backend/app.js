const express = require("express");
const mongoose = require("mongoose");
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const cors = require("cors");
const Campground = require("./models/campground");
const Review = require("./models/review");

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

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.send("home");
});

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    try {
      const campgrounds = await Campground.find({});
      res.json(campgrounds);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.post(
  "/campgrounds",
  validateCampground,
  catchAsync(async (req, res) => {
    try {
      const campground = new Campground(req.body.campground);
      await campground.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    try {
      const campground = await Campground.findById(req.params.id).populate(
        "reviews"
      );
      res.json(campground);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.put(
  "/campgrounds/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
      });
      res.send(campground);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCampground = await Campground.findByIdAndDelete(id);
      if (!deletedCampground) {
        res.status(400);
      }
      res.status(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.post(
  "/campgrounds/:id/reviews",
  validateReview,
  catchAsync(async (req, res) => {
    try {
      const campground = await Campground.findById(req.params.id);
      const review = new Review(req.body.review);
      campground.reviews.push(review);
      await review.save();
      await campground.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.delete(
  "/campgrounds/:id/reviews/:reviewId",
  catchAsync(async (req, res) => {
    try {
      const { id, reviewId } = req.params;
      await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

app.listen(5000, () => {
  console.log("Serving on port 5000");
});
