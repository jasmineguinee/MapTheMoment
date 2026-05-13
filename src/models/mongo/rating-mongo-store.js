import Mongoose from "mongoose";
import { Rating } from "./rating.js";

export const ratingMongoStore = {
  async getAllRatings() {
    const ratings = await Rating.find().lean();
    return ratings;
  },
  // ratings on public venues
    async getPublicRatings(id) {
    const publicRatings = await Rating.find({ visability: "public" }).lean();
    return publicRatings;
  },
 

  async addRating(venueId, rating) {
    rating.venueid = venueId;
    const newRating = new Rating(rating);
    const ratingObj = await newRating.save();
    return this.getRatingById(ratingObj._id);
  },

  async getRatingsByVenueId(id) {
    const ratings = await Rating.find({ ratingid: id }).lean();
    return ratings;
  },

  async getRatingById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const rating = await Rating.findOne({ _id: id }).lean();
      return rating;
    }
    return null;
  },

  async deleteRating(id) {
    try {
      await Rating.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllRatings() {
    await Rating.deleteMany({});
  },

  async updateRating(rating, updatedRating) {
    const ratingDoc = await Rating.findOne({ _id: rating._id });
    ratingDoc.number = updatedRating.number;
  
    await ratingDoc.save();
  },
};
