import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  content: String,
  postedBy: String,
  venueid: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
  },
});



export const Review = Mongoose.model("Review", reviewSchema);
