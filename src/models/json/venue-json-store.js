import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const venueJsonStore = {
  async getAllVenues() {
    await db.read();
    return db.data.venues;
  },
  // using this to get all the public venues on the homepage

  async getPublicVenues(){
    await db.read();

    let publicVenues = db.data.venues.filter((venue) => venue.visability === "public");
    if (!publicVenues) {
      publicVenues = null;
    }
    return publicVenues;
  },
// getting any public wedding venues (public posts by anyone on the website )
  async getPublicWeddingVenues(){
    await db.read();

    let pubWeddingVenues = db.data.venues.filter((venue) => venue.visability === "public", venue.venuetype === "wedding" );
    if (!publicVenues) {
      pubWeddingVenues = null;
    }
    return pubWeddingVenues;
  },
  
 // get all the public proposal venues
      async getPublicProposalSpots(){
      await db.read();
  
      let pubProposalSpots= db.data.venues.filter((venue) => venue.visability === "public", venue.venuetype === "proposal" );
      if (!pubProposalSpots) {
        pubProposalSpots = null;
      }
      return pubProposalSpots;
    },

    /// USERS AREA VENUES BY TYPE - wedding
    async getAreaWeddingVenues(areaId) {
    await db.read();
    let foundVenues = venues.filter((venue) => venue.areaid === areaId, venue.venuetype === "wedding");
    if (!foundVenues) {
      foundVenues = null;
    }
    return foundVenues;
  },
  /// USERS AREA VENUES BY TYPE - proposal
   async getAreaProposalVenues(areaId) {
    await db.read();
    let foundVenues = venues.filter((venue) => venue.areaid === areaId, venue.venuetype === "proposal");
    if (!foundVenues) {
      foundVenues = null;
    }
    return foundVenues;
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
    venue.visability = updatedVenue.visability;
    await db.write();
  },
};
