import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const ratingJsonStore = {
  async getAllRatings() {
    await db.read();
    return db.data.ratings;
  },


  async addRating(venueId, rating) {
    await db.read();
    rating._id = v4();
    rating.venueid = venueId;
    db.data.ratings.push(rating);
    await db.write();
    return rating;
  },

  async getRatingsByVenueId(id) {
    await db.read();
    let foundRatings = db.data.ratings.filter((rating) => rating.venueid === id);
    if (!foundRatings) {
      foundRatings = null;
    }
    return foundRatings;
  },

  async getRatingById(id) {
    await db.read();
    let foundRating = db.data.ratings.find((rating) => rating._id === id);
    if (!foundRating) {
      foundRating = null;
    }
    return foundRating;
  },

  async getVenueRatings(venueId) {
    await db.read();
    let foundRatings = ratings.filter((rating) => rating.venueid === venueId);
    if (!foundRatings) {
      foundRatings = null;
    }
    return foundRatings;
  },

  async deleteRating(id) {
    await db.read();
    const index = db.data.ratings.findIndex((rating) => rating._id === id);
    if (index !== -1) db.data.ratings.splice(index, 1);
    await db.write();
  },

  async deleteAllRatings() {
    db.data.ratings = [];
    await db.write();
  },

  async updateRating(venue, updatedRating) {
    rating.number = updatedRating.number;
    await db.write();
  },
};
