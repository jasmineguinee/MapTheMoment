import { db } from "../models/db.js";

export const areaController = {
  index: {
    handler: async function (request, h) {
      const area = await db.areaStore.getAreaById(request.params.id);
      const viewData = {
        title: "Area",
        area: area,
      };
      return h.view("area-view", viewData);
    },
  },

  addVenue: {
    handler: async function (request, h) {
      const area = await db.areaStore.getAreaById(request.params.id);
      const newVenue = {
        title: request.payload.title,
        venuetype: request.payload.venuetype,
        description: request.payload.description,
      };
      await db.venueStore.addVenue(area._id, newVenue);
      return h.redirect(`/area/${area._id}`);
    },
  },
};
