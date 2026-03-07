import Mongoose from "mongoose";
import { Occasion } from "./occasion.js";
import { venueMongoStore } from "./venue-mongo-store.js";

export const occasionMongoStore = {
  async getAllOccasions() {
    const occasions = await Occasion.find().lean();
    return occasions;
  },

  async getOccasionById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const occasion = await Occasion.findOne({ _id: id }).lean();
      if (occasion) {
        occasion.venues = await venueMongoStore.getVenuesByOccasionId(occasion._id);
      }
      return occasion;
    }
    return null;
  },

  async addOccasion(occasion) {
    const newOccasion = new Occasion(occasion);
    const occasionObj = await newOccasion.save();
    return this.getOccasionById(occasionObj._id);
  },

  async getUserOccasions(id) {
    const occasion = await Occasion.find({ userid: id }).lean();
    return occasion;
  },

  async deleteOccasionById(id) {
    try {
      await Occasion.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllOccasions() {
    await Occasion.deleteMany({});
  }
};
