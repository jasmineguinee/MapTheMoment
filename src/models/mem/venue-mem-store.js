import { v4 } from "uuid";

let venues = [];

export const venueMemStore = {
  async getAllVenues() {
    return venues;
  },

  async addVenue(occasionId, venue) {
    venue._id = v4();
    venue.occasionid = occasionId;
    venues.push(venue);
    return venue;
  },

  async getVenuesByOccasionId(id) {
    return venues.filter((venue) => venue.occasionid === id);
  },

  async getVenueById(id) {
    let foundVenue = venues.find((venue) => venue._id === id);
    if (!foundVenue) {
      foundVenue = null;
    }
    return foundVenue;
  },

  async getOccasionVenues(occasionId) {
    let foundVenues = venues.filter((venue) => venue.occasionid === occasionId);
    if (!foundVenues) {
      foundVenues = null;
    }
    return foundVenues;
  },

  async deleteVenue(id) {
    const index = venues.findIndex((venue) => venue._id === id);
    if (index !== -1) venues.splice(index, 1);
  },


  async deleteAllVenues() {
    venues = [];
  },

  async updateVenue(venue, updatedVenue) {
    venue.title = updatedVenue.title;
    venue.venuetype = updatedVenue.venuetype;
    venue.description = updatedVenue.venuedescription;
    venue.latitude = updatedVenue.latitude;
    venue.longitude = updatedVenue.longitude;
  },
};
