import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const areas = await db.areaStore.getUserAreas(loggedInUser._id);
      const viewData = {
        title: "Area Dashboard",
        user: loggedInUser,
        areas: areas,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addArea: {
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
};
