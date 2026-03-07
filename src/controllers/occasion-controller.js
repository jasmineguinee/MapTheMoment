import { db } from "../models/db.js";
import { VenueSpec } from "../models/joi-schemas.js";

export const occasionController = {
  index: {
    handler: async function (request, h) {
      const occasion = await db.occasionStore.getOccasionById(request.params.id);
      const viewData = {
        title: "Occasion",
        occasion: occasion,
      };
      return h.view("occasion-view", viewData);
    },
  },

  addVenue: {
    validate: {
      payload: VenueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("occasion-view", { title: "Add venue error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const occasion = await db.occasionStore.getOccasionById(request.params.id);
      const newVenue = {
        title: request.payload.title,
        venuetype: request.payload.venuetype,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.venueStore.addVenue(occasion._id, newVenue);
      return h.redirect(`/occasion/${occasion._id}`);
    },
  },

    deleteVenue: {
    handler: async function(request, h) {
      const occasion = await db.occasionStore.getOccasionById(request.params.id);
      await db.venueStore.deleteVenue(request.params.venueid);
      return h.redirect(`/occasion/${occasion._id}`);
    },
  },

};
