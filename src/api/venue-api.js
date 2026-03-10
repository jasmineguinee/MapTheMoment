import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, VenueSpec, VenueSpecPlus, VenueArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const venueApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const venues = await db.venueStore.getAllVenues();
        return venues;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: VenueArraySpec, failAction: validationError },
    description: "Get all venueApi",
    notes: "Returns all venueApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const venue = await db.venueStore.getVenueById(request.params.id);
        if (!venue) {
          return Boom.notFound("No venue with this id");
        }
        return venue;
      } catch (err) {
        return Boom.serverUnavailable("No venue with this id");
      }
    },
    tags: ["api"],
    description: "Find a Venue",
    notes: "Returns a venue",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: VenueSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const venue = await db.venueStore.addVenue(request.params.id, request.payload);
        if (venue) {
          return h.response(venue).code(201);
        }
        return Boom.badImplementation("error creating venue");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a venue",
    notes: "Returns the newly created venue",
    validate: { payload: VenueSpec },
    response: { schema: VenueSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.venueStore.deleteAllVenues();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all venueApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const venue = await db.venueStore.getVenueById(request.params.id);
        if (!venue) {
          return Boom.notFound("No Venue with this id");
        }
        await db.venueStore.deleteVenue(venue._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Venue with this id");
      }
    },
    tags: ["api"],
    description: "Delete a venue",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
