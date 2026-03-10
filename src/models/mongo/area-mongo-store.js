import Mongoose from "mongoose";
import { Area } from "./area.js";
import { venueMongoStore } from "./venue-mongo-store.js";

export const areaMongoStore = {
  async getAllAreas() {
    const areas = await Area.find().lean();
    return areas;
  },

  async getAreaById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const area = await Area.findOne({ _id: id }).lean();
      if (area) {
        area.venues = await venueMongoStore.getVenuesByAreaId(area._id);
      }
      return area;
    }
    return null;
  },

  async addArea(area) {
    const newArea = new Area(area);
    const areaObj = await newArea.save();
    return this.getAreaById(areaObj._id);
  },

  async getUserAreas(id) {
    const area = await Area.find({ userid: id }).lean();
    return area;
  },

  async deleteAreaById(id) {
    try {
      await Area.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllAreas() {
    await Area.deleteMany({});
  }
};
