import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const venueJsonStore = {
  async getAllVenues() {
    await db.read();
    return db.data.venues;
  },

  async addVenue(areaId, venue) {
    await db.read();
    venue._id = v4();
    venue.areaid = areaId;
    db.data.venues.push(venue);
    await db.write();
    return venue;
  },

  async getVenuesByAreaId(id) {
    await db.read();
    return db.data.venues.filter((venue) => venue.areaid === id);
  },

  async getVenueById(id) {
    await db.read();
    return db.data.venues.find((venue) => venue._id === id);
  },

  async deleteVenue(id) {
    await db.read();
    const index = db.data.venues.findIndex((venue) => venue._id === id);
    db.data.venues.splice(index, 1);
    await db.write();
  },

  async deleteAllVenues() {
    db.data.venues = [];
    await db.write();
  },

  async updateVenue(venue, updatedVenue) {
    venue.title = updatedVenue.title;
    venue.artist = updatedVenue.artist;
    venue.duration = updatedVenue.duration;
    await db.write();
  },
};
