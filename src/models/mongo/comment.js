import Mongoose from "mongoose";

const { Schema } = Mongoose;

const commentSchema = new Schema({
  content: String,

  venueid: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
  },
});

export const Comment = Mongoose.model("Comment", commentSchema);
