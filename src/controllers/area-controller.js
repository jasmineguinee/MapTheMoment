import { db } from "../models/db.js";
import { VenueSpec } from "../models/joi-schemas.js";
import { cleanHtml, cleanString } from "../utils/sanitisation.js";

export const areaController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const area = await db.areaStore.getAreaById(request.params.id);
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const weddingVenues = await db.venueStore.getAreaWeddingVenues(request.params.id);
      const proposalVenues = await db.venueStore.getAreaProposalVenues(request.params.id);
      const weddingVenuesStrings = JSON.stringify(weddingVenues);
      const proposalVenueStrings = JSON.stringify(proposalVenues);
      const viewData = {
        title: "Area",
        area: area,
        venue: venue,
        weddingVenuesStrings: weddingVenuesStrings,
        proposalVenueStrings: proposalVenueStrings
      };
      return h.view("area-view", viewData);
    },
  },
  
  addVenue: {
    validate: {
      payload: VenueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("area-view", { title: "Add venue error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const area = await db.areaStore.getAreaById(request.params.id);
      const poster = loggedInUser.firstName.concat(" ", loggedInUser.lastName);
    
      const newVenue = {
        title: cleanString(request.payload.title),
        venuetype: cleanString(request.payload.venuetype),
        description: cleanHtml(request.payload.description),
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        visability: cleanString(request.payload.visability),
        poster: poster,
       
      };
      await db.venueStore.addVenue(area._id, newVenue);
      return h.redirect(`/area/${area._id}`);
    },
  },

    deleteVenue: {
    handler: async function(request, h) {
      const area = await db.areaStore.getAreaById(request.params.id);
      await db.venueStore.deleteVenue(request.params.venueid);
      return h.redirect(`/area/${area._id}`);
    },
  },



};