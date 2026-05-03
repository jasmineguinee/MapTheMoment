import { v4 } from "uuid";

let comments = [];

export const commentMemStore = {
  async getAllComments() {
    return comments;
  },

  // function to get public comments only

 async getPublicComments(){
    await db.read();

    let publicComments = db.data.comments.filter((comment) => comment.visability === "public");
    if (!publicComments) {
      publicComments = null;
    }
    return publicComments;
  },

 


  async addComment(venueId, comment) {
    comment._id = v4();
    comment.venueid = venueId;
    comments.push(comment);
    return comment;
  },

  async getCommentsByVenueId(id) {
    return comments.filter((comment) => comment.venueid === id);
  },

  async getCommentById(id) {
    let foundComment = comments.find((comment) => comment._id === id);
    if (!foundComment) {
      foundComment = null;
    }
    return foundComment;
  },

  async getVenueComments(venueId) {
    let foundComments = comments.filter((comment) => comment.venueid === venueId);
    if (!foundComments) {
      foundComments = null;
    }
    return foundComments;
  },

  async deleteComment(id) {
    const index = comments.findIndex((comment) => comment._id === id);
    if (index !== -1) comments.splice(index, 1);
  },


  async deleteAllComments() {
    comments = [];
  },

  async updateComment(comment, updatedComment) {
    comment.content = updatedComment.content;
 
  },
};
