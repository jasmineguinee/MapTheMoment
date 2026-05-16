import Mongoose from "mongoose";
import { Post } from "./post.js";

export const postMongoStore = {
  async getAllPosts() {
    const posts = await Post.find().lean();
    return posts;
  },

  async getPostById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const post = await Post.findOne({ _id: id }).lean();
      return post;
    }
    return null;
  },

  async addPost(post) {
    const newPost = new Post(post);
    const postObj = await newPost.save();
    return this.getPostById(postObj._id);
  },

  async getUserPosts(id) {
    const post = await Post.find({ userid: id }).lean();
    return post;
  },

  async deletePostById(id) {
    try {
      await Post.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPosts() {
    await Post.deleteMany({});
  }
};
