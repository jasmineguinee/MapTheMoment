import { VenueSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const venueController = {
  index: {
    handler: async function (request, h) {
      const area = await db.areaStore.getAreaById(request.params.id);
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const weddingVenues = await db.venueStore.getAreaWeddingVenues(request.params.id);
      const proposalVenues = await db.venueStore.getAreaProposalVenues(request.params.id);
      const weddingVenuesStrings = JSON.stringify(weddingVenues);
      const proposalVenueStrings = JSON.stringify(proposalVenues);
      const viewData = {
        title: "Add the title",
        area: area,
        venue: venue,
        weddingVenuesStrings: weddingVenuesStrings,
        proposalVenueStrings: proposalVenueStrings
      };
      return h.view("venue-view", viewData);
    },
  },

  update: {
    validate: {
      payload: VenueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("venue-view", { title: "Edit venue error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const newVenue = {
        title: request.payload.title,
        venuetype: request.payload.venuetype,
        description:request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        visability: request.payload.visability,
      };
      await db.venueStore.updateVenue(venue, newVenue);
      return h.redirect(`/area/${request.params.id}`);
    },
  },
};