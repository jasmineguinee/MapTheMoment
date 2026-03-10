import { VenueSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const venueController = {
  index: {
    handler: async function (request, h) {
      const occasion = await db.occasionStore.getOccasionById(request.params.id);
      const venue = await db.venueStore.getVenueById(request.params.venueid);
      const viewData = {
        title: "Add the title",
        occasion: occasion,
        venue: venue
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
        venuetype: request.payload.artist,
        description:request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.venueStore.updateVenue(venue, newVenue);
      return h.redirect(`/occasion/${request.params.id}`);
    },
  },
};