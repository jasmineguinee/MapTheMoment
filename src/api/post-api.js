import Boom from "@hapi/boom";
import { IdSpec, PostArraySpec, PostSpec, PostSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const postApi = {
    find: {
    auth: {
      strategy: "jwt"
    },
    handler: async function (request, h) {
      try {
        const posts = await db.postStore.getAllPosts();
        return posts;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
     tags: ["api"],
    response: { schema: PostArraySpec, failAction: validationError },
    description: "Get all posts",
    notes: "Returns all posts",
  },


    findOne: {
    auth: false,
    async handler(request) {
      try {
        const post = await db.postStore.getPostById(request.params.id);
        if (!post) {
          return Boom.notFound("No Post with this id");
        }
        return post;
      } catch (err) {
        return Boom.serverUnavailable("No Post with this id");
      }
    },
    tags: ["api"],
    description: "Find a Post",
    notes: "Returns a post",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PostSpecPlus, failAction: validationError },
  },


   create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const post = request.payload;
        const newPost = await db.postStore.addPost(post);
        if (newPost) {
          return h.response(newPost).code(201);
        }
        return Boom.badImplementation("error creating post");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create an Post",
    notes: "Returns the newly created post",
    validate: { payload: PostSpec, failAction: validationError },
    response: { schema: PostSpecPlus, failAction: validationError },
  },

    deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const post = await db.postStore.getPostById(request.params.id);
        if (!post) {
          return Boom.notFound("No Post with this id");
        }
        await db.postStore.deletePostById(post._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Post with this id");
      }
    },
     tags: ["api"],
    description: "Delete an post",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },


    deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.postStore.deleteAllPosts();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PostApi",
  },


};
