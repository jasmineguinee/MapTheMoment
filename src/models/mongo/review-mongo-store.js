import Mongoose from "mongoose";
import { Review } from "./review.js";

export const reviewMongoStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },
  // reviews on public venues
    async getPublicReviews(id) {
    const publicReviews = await Review.find({ visability: "public" }).lean();
    return publicReviews;
  },
 

  async addReview(venueId, review) {
    review.venueid = venueId;
    const newReview = new Review(review);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },

  async getReviewsByVenueId(id) {
    const reviews = await Review.find({ reviewid: id }).lean();
    return reviews;
  },

  async getReviewById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const review = await Review.findOne({ _id: id }).lean();
      return review;
    }
    return null;
  },

  async deleteReview(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllReviews() {
    await Review.deleteMany({});
  },

  async updateReview(review, updatedReview) {
    const reviewDoc = await Review.findOne({ _id: review._id });
    reviewDoc.content = updatedReview.content;
    reviewDoc.postedBy = updatedReview.postedBy;
    await reviewDoc.save();
  },
};
