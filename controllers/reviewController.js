import Review from '../models/reviewModel.js';

export const listReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews); //returns all Review in no order
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const mostRecent = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews); //returns all Review in the order of the most recent
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const mostHelpful = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ markAsHelpful: -1 });
    res.json(reviews); //returns all Review sorted by the most helpful
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.json(review); //returns the created Review
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

export const markAsHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    review.markAsHelpful++;

    const updatedReview = await review.save(); 

    res.json(updatedReview); //returns the saved updated Review
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}