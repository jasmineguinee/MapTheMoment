import Mongoose from "mongoose";

const { Schema } = Mongoose;

const postSchema = new Schema({
  body: String,
  venueid: String,
  poster: String,
  time: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Post = Mongoose.model("Post", postSchema);
