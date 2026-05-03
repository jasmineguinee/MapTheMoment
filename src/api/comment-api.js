import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, CommentSpec, CommentSpecPlus, CommentArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const commentApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const comments = await db.commentStore.getAllComments();
        return comments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: CommentArraySpec, failAction: validationError },
    description: "Get all commentApi",
    notes: "Returns all commentApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const comment = await db.commentStore.getCommentById(request.params.id);
        if (!comment) {
          return Boom.notFound("No comment with this id");
        }
        return comment;
      } catch (err) {
        return Boom.serverUnavailable("No comment with this id");
      }
    },
    tags: ["api"],
    description: "Find a Comment",
    notes: "Returns a comment",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CommentSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const comment = await db.commentStore.addComment(request.params.id, request.payload);
        if (comment) {
          return h.response(comment).code(201);
        }
        return Boom.badImplementation("error creating comment");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a comment",
    notes: "Returns the newly created comment",
    validate: { payload: CommentSpec },
    response: { schema: CommentSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.commentStore.deleteAllComments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all commentApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const comment = await db.commentStore.getCommentById(request.params.id);
        if (!comment) {
          return Boom.notFound("No Comment with this id");
        }
        await db.commentStore.deleteComment(comment._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Comment with this id");
      }
    },
    tags: ["api"],
    description: "Delete a comment",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
