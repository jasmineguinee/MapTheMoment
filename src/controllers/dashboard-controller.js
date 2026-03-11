import { db } from "../models/db.js";
import { AreaSpec } from "../models/joi-schemas.js";


export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const area = await db.areaStore.getUserAreas(loggedInUser._id);
      const pubWeddingVenues = await db.venueStore.getPublicWeddingVenues();
      const pubProposalSpots = await db.venueStore. getPublicProposalSpots();
      const pubWeddingVenueStrings = JSON.stringify(pubWeddingVenues);
      const pubProposalSpotsStrings = JSON.stringify(pubProposalSpots);
      
      const viewData = {
        title: "MapTheMoment Dashboard",
        user: loggedInUser,
        areas: area,
        pubWeddingVenueStrings: pubWeddingVenueStrings,
        pubProposalSpotsStrings: pubProposalSpotsStrings
      };
      return h.view("dashboard-view", viewData);
      
    },
  },

  addArea: {
     validate: {
      payload: AreaSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Area error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newArea = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.areaStore.addArea(newArea);
      return h.redirect("/dashboard");
    },
  },

    deleteArea: {
    handler: async function (request, h) {
      const area = await db.areaStore.getAreaById(request.params.id);
      await db.areaStore.deleteAreaById(area._id);
      return h.redirect("/dashboard");
    },
  },

};
