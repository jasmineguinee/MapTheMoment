import Mongoose from "mongoose";
import { Venue } from "./venue.js";

export const venueMongoStore = {
  async getAllVenues() {
    const venues = await Venue.find().lean();
    return venues;
  },

    async getPublicVenues(id) {
    const publicVenues = await Venue.find({ visability: "public" }).lean();
    return publicVenues;
  },

  async addVenue(areaId, venue) {
    venue.areaid = areaId;
    const newVenue = new Venue(venue);
    const venueObj = await newVenue.save();
    return this.getVenueById(venueObj._id);
  },

  async getVenuesByAreaId(id) {
    const venues = await Venue.find({ areaid: id }).lean();
    return venues;
  },

  async getVenueById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const venue = await Venue.findOne({ _id: id }).lean();
      return venue;
    }
    return null;
  },

  async deleteVenue(id) {
    try {
      await Venue.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllVenues() {
    await Venue.deleteMany({});
  },

  async updateVenue(venue, updatedVenue) {
    const venueDoc = await Venue.findOne({ _id: venue._id });
    venueDoc.title = updatedVenue.title;
    venueDoc.venuetype = updatedVenue.venuetype;
    venueDoc.description = updatedVenue.description;
    venueDoc.latitude = updatedVenue.latitude;
    venueDoc.longitude = updatedVenue.longitude;
    venueDoc.visability = updatedVenue.visability;
    await venueDoc.save();
  },
};
