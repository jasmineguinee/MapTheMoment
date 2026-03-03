import { v4 } from "uuid";

let venues = [];

export const venueMemStore = {
  async getAllVenues() {
    return venues;
  },

  async addVenue(areaId, venue) {
    venue._id = v4();
    venue.areaid = areaId;
    venues.push(venue);
    return venue;
  },

  async getVenuesByAreaId(id) {
    return venues.filter((venue) => venue.areaid === id);
  },

  async getVenueById(id) {
    return venues.find((venue) => venue._id === id);
  },

  async getAreaVenues(areaId) {
    return venues.filter((venue) => venue.areaid === areaId);
  },

  async deleteVenue(id) {
    const index = venues.findIndex((venue) => venue._id === id);
    venues.splice(index, 1);
  },

  async deleteAllVenues() {
    venues = [];
  },

  async updateVenue(venue, updatedVenue) {
    venue.title = updatedVenue.title;
    venue.venuetype = updatedVenue.venuetype;
  },
};
