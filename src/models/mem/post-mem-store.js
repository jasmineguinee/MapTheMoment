import { v4 } from "uuid";

let posts = [];

export const postMemStore = {
  async getAllPosts() {
    return posts;
  },

  async addPost(post) {
    post._id = v4();
    posts.push(post);
    return post;
  },

  async getPostById(id) {
    const list = posts.find((post) => post._id === id);
    return list;
  },

  async deletePostById(id) {
    const index = posts.findIndex((post) => post._id === id);
    posts.splice(index, 1);
  },

  async deleteAllPosts() {
    posts = [];
  },

    async getUserPosts(userid) {
    return posts.filter((post) => post.userid === userid);
  },

};
