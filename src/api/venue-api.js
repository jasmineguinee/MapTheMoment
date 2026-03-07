import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const venueApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const venues = await db.venueStore.getAllVenues();
        return venues;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
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
  },
};
