
import { db } from "../models/db.js";
import { OccasionSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const occasions = await db.occasionStore.getUserOccasions(loggedInUser._id);
      const viewData = {
        title: "MapTheMoment Dashboard",
        user: loggedInUser,
        occasions: occasions,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addOccasion: {
     validate: {
      payload: OccasionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Occasion error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newOccasion = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.occasionStore.addOccasion(newOccasion);
      return h.redirect("/dashboard");
    },
  },

    deleteOccasion: {
    handler: async function (request, h) {
      const occasion = await db.occasionStore.getOccasionById(request.params.id);
      await db.occasionStore.deleteOccasionById(occasion._id);
      return h.redirect("/dashboard");
    },
  },

};
