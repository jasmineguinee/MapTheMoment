import { v4 } from "uuid";
import { db } from "./store-utils.js";


export const postJsonStore = {
  async getAllPosts() {
    await db.read();
    return db.data.posts;
    
  },

  async addPost(post) {
    await db.read();
    post._id = v4();
    db.data.posts.push(post);
    await db.write();
    return post;
  },

  async getPostById(id) {
    await db.read();
    let list = db.data.posts.find((post) => post._id === id);
    if (!list) {
      list = null;
    }
    return list;
  },

  async getUserPosts(userid) {
    await db.read();
    return db.data.posts.filter((post) => post.userid === userid);
  },

  async deletePostById(id) {
    await db.read();
    const index = db.data.posts.findIndex((post) => post._id === id);
    if (index !== -1) db.data.posts.splice(index, 1);
    await db.write();
  },

  async deleteAllPosts() {
    db.data.posts = [];
    await db.write();
  },
};
