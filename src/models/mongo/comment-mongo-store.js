import Mongoose from "mongoose";
import { Comment } from "./comment.js";

export const commentMongoStore = {
  async getAllComments() {
    const comments = await Comment.find().lean();
    return comments;
  },
  // comments on public venues
    async getPublicComments(id) {
    const publicComments = await Comment.find({ visability: "public" }).lean();
    return publicComments;
  },
 

  async addComment(venueId, comment) {
    comment.venueid = venueId;
    const newComment = new Comment(comment);
    const commentObj = await newComment.save();
    return this.getCommentById(commentObj._id);
  },

  async getCommentsByVenueId(id) {
    const comments = await Comment.find({ commentid: id }).lean();
    return comments;
  },

  async getCommentById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const comment = await Comment.findOne({ _id: id }).lean();
      return comment;
    }
    return null;
  },

  async deleteComment(id) {
    try {
      await Comment.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllComments() {
    await Comment.deleteMany({});
  },

  async updateComment(comment, updatedComment) {
    const commentDoc = await Comment.findOne({ _id: comment._id });
    commentDoc.content = updatedComment.content;
    await commentDoc.save();
  },
};
