import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  image: {
    type: String,
  }, 
  aboutLandlord: {
    type: String,
    required: true
  }, 
  location: {
    type: String,
    required: true
  },
  qualityOfAmenities: {
    type: String,
    required: true
  },
  markAsHelpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Review = mongoose.model('review', reviewSchema);

export default Review;