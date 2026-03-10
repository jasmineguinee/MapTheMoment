import Boom from "@hapi/boom";
import { IdSpec, OccasionArraySpec, OccasionSpec, OccasionSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const occasionApi = {
    find: {
    auth: {
      strategy: "jwt"
    },
    handler: async function (request, h) {
      try {
        const occasions = await db.occasionStore.getAllOccasions();
        return occasions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
     tags: ["api"],
    response: { schema: OccasionArraySpec, failAction: validationError },
    description: "Get all occasions",
    notes: "Returns all occasions",
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
    tags: ["api"],
    description: "Find a Occasion",
    notes: "Returns a occasion",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: OccasionSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Create an Occasion",
    notes: "Returns the newly created occasion",
    validate: { payload: OccasionSpec, failAction: validationError },
    response: { schema: OccasionSpecPlus, failAction: validationError },
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
     tags: ["api"],
    description: "Delete an occasion",
    validate: { params: { id: IdSpec }, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all OccasionApi",
  },


};
