import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const occasionApi = {
    find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const occasions = await db.occasionStore.getAllOccasions();
        return occasions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },


    findOne: {
    auth: false,
    async handler(request) {
      try {
        const occasion = await db.occasionStore.getOccasionById(request.params.id);
        if (!occasion) {
          return Boom.notFound("No Occasion with this id");
        }
        return occasion;
      } catch (err) {
        return Boom.serverUnavailable("No Occasion with this id");
      }
    },
  },


   create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const occasion = request.payload;
        const newOccasion = await db.occasionStore.addOccasion(occasion);
        if (newOccasion) {
          return h.response(newOccasion).code(201);
        }
        return Boom.badImplementation("error creating occasion");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

    deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const occasion = await db.occasionStore.getOccasionById(request.params.id);
        if (!occasion) {
          return Boom.notFound("No Occasion with this id");
        }
        await db.occasionStore.deleteOccasionById(occasion._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Occasion with this id");
      }
    },
  },


    deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.occasionStore.deleteAllOccasions();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },


};
