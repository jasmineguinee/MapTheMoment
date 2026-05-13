import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, RatingSpec, RatingSpecPlus, RatingArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const ratingApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const ratings = await db.ratingStore.getAllRatings();
        return ratings;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: RatingArraySpec, failAction: validationError },
    description: "Get all ratingApi",
    notes: "Returns all ratingApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const rating = await db.ratingStore.getRatingById(request.params.id);
        if (!rating) {
          return Boom.notFound("No rating with this id");
        }
        return rating;
      } catch (err) {
        return Boom.serverUnavailable("No rating with this id");
      }
    },
    tags: ["api"],
    description: "Find a rating",
    notes: "Returns a rating",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: RatingSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const rating = await db.ratingStore.addRating(request.params.id, request.payload);
        if (rating) {
          return h.response(rating).code(201);
        }
        return Boom.badImplementation("error creating rating");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a rating",
    notes: "Returns the newly created rating",
    validate: { payload: RatingSpec },
    response: { schema: RatingSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.ratingStore.deleteAllRatings();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all ratingApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const rating = await db.ratingStore.getRatingById(request.params.id);
        if (!rating) {
          return Boom.notFound("No rating with this id");
        }
        await db.ratingStore.deleteRating(rating._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No rating with this id");
      }
    },
    tags: ["api"],
    description: "Delete a rating",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
