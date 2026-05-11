import { v4 } from "uuid";

let reviews = [];

export const reviewMemStore = {
  async getAllReviews() {
    return reviews;
  },

  // function to get public reviews only

 async getPublicReviews(){
    await db.read();

    let publicReviews = db.data.reviews.filter((review) => review.visability === "public");
    if (!publicReviews) {
      publicReviews = null;
    }
    return publicReviews;
  },

 


  async addReview(venueId, review) {
    review._id = v4();
    review.venueid = venueId;
    reviews.push(review);
    return review;
  },

  async getReviewsByVenueId(id) {
    return reviews.filter((review) => review.venueid === id);
  },

  async getReviewById(id) {
    let foundReview = reviews.find((review) => review._id === id);
    if (!foundReview) {
      foundReview = null;
    }
    return foundReview;
  },

  async getVenueReviews(venueId) {
    let foundReviews = reviews.filter((review) => review.venueid === venueId);
    if (!foundReviews) {
      foundReviews = null;
    }
    return foundReviews;
  },

  async deleteReview(id) {
    const index = reviews.findIndex((review) => review._id === id);
    if (index !== -1) reviews.splice(index, 1);
  },


  async deleteAllReviews() {
    reviews = [];
  },

  async updateReview(review, updatedReview) {
    review.content = updatedReview.content;
    review.postedBy = updatedReview.postedBy;
  },
};
