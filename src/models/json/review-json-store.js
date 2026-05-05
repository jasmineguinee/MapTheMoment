import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const reviewJsonStore = {
  async getAllReviews() {
    await db.read();
    return db.data.reviews;
  },


  async addReview(venueId, review) {
    await db.read();
    review._id = v4();
    review.venueid = venueId;
    db.data.reviews.push(review);
    await db.write();
    return review;
  },

  async getReviewsByVenueId(id) {
    await db.read();
    let foundReviews = db.data.reviews.filter((review) => review.venueid === id);
    if (!foundReviews) {
      foundReviews = null;
    }
    return foundReviews;
  },

  async getReviewById(id) {
    await db.read();
    let foundReview = db.data.reviews.find((review) => review._id === id);
    if (!foundReview) {
      foundReview = null;
    }
    return foundReview;
  },

  async getVenueReviews(venueId) {
    await db.read();
    let foundReviews = reviews.filter((review) => review.venueid === venueId);
    if (!foundReviews) {
      foundReviews = null;
    }
    return foundReviews;
  },

  async deleteReview(id) {
    await db.read();
    const index = db.data.reviews.findIndex((review) => review._id === id);
    if (index !== -1) db.data.reviews.splice(index, 1);
    await db.write();
  },

  async deleteAllReviews() {
    db.data.reviews = [];
    await db.write();
  },

  async updateReview(venue, updatedReview) {
    review.content = updatedReview.content;
    await db.write();
  },
};
