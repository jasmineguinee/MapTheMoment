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
    let foundVenues = db.data.venues.filter((venue) => venue.areaid === id);
    if (!foundVenues) {
      foundVenues = null;
    }
    return foundVenues;
  },

  async getVenueById(id) {
    await db.read();
    let foundVenue = db.data.venues.find((venue) => venue._id === id);
    if (!foundVenue) {
      foundVenue = null;
    }
    return foundVenue;
  },

  async getAreaVenues(areaId) {
    await db.read();
    let foundVenues = venues.filter((venue) => venue.areaid === areaId);
    if (!foundVenues) {
      foundVenues = null;
    }
    return foundVenues;
  },

  async deleteVenue(id) {
    await db.read();
    const index = db.data.venues.findIndex((venue) => venue._id === id);
    if (index !== -1) db.data.venues.splice(index, 1);
    await db.write();
  },

  async deleteAllVenues() {
    db.data.venues = [];
    await db.write();
  },

  async updateVenue(venue, updatedVenue) {
    venue.title = updatedVenue.title;
    venue.venuetype = updatedVenue.venuetype;
    venue.description = updatedVenue.description;
    venue.latitude = updatedVenue.latitude;
    venue.longitude = updatedVenue.longitude;
    await db.write();
  },
};
