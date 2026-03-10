import Boom from "@hapi/boom";
import { IdSpec, AreaArraySpec, AreaSpec, AreaSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const areaApi = {
    find: {
    auth: {
      strategy: "jwt"
    },
    handler: async function (request, h) {
      try {
        const areas = await db.areaStore.getAllAreas();
        return areas;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
     tags: ["api"],
    response: { schema: AreaArraySpec, failAction: validationError },
    description: "Get all areas",
    notes: "Returns all areas",
  },


    findOne: {
    auth: false,
    async handler(request) {
      try {
        const area = await db.areaStore.getAreaById(request.params.id);
        if (!area) {
          return Boom.notFound("No Area with this id");
        }
        return area;
      } catch (err) {
        return Boom.serverUnavailable("No Area with this id");
      }
    },
    tags: ["api"],
    description: "Find a Area",
    notes: "Returns a area",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: AreaSpecPlus, failAction: validationError },
  },


   create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const area = request.payload;
        const newArea = await db.areaStore.addArea(area);
        if (newArea) {
          return h.response(newArea).code(201);
        }
        return Boom.badImplementation("error creating area");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create an Area",
    notes: "Returns the newly created area",
    validate: { payload: AreaSpec, failAction: validationError },
    response: { schema: AreaSpecPlus, failAction: validationError },
  },

    deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const area = await db.areaStore.getAreaById(request.params.id);
        if (!area) {
          return Boom.notFound("No Area with this id");
        }
        await db.areaStore.deleteAreaById(area._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Area with this id");
      }
    },
     tags: ["api"],
    description: "Delete an area",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },


    deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.areaStore.deleteAllAreas();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all AreaApi",
  },


};
