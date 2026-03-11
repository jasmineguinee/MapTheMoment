import { v4 } from "uuid";

let venues = [];

export const venueMemStore = {
  async getAllVenues() {
    return venues;
  },

  // function to get public venues only

 async getPublicVenues(){
    await db.read();

    let publicVenues = db.data.venues.filter((venue) => venue.visability === "public");
    if (!publicVenues) {
      publicVenues = null;
    }
    return publicVenues;
  },
   // get all the public wedding venues
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
    venue._id = v4();
    venue.areaid = areaId;
    venues.push(venue);
    return venue;
  },

  async getVenuesByAreaId(id) {
    return venues.filter((venue) => venue.areaid === id);
  },

  async getVenueById(id) {
    let foundVenue = venues.find((venue) => venue._id === id);
    if (!foundVenue) {
      foundVenue = null;
    }
    return foundVenue;
  },

  async getAreaVenues(areaId) {
    let foundVenues = venues.filter((venue) => venue.areaid === areaId);
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
    venue.visability = updatedVenue.visability;
  },
};
