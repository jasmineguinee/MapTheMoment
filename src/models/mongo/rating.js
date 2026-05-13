import Mongoose from "mongoose";

const { Schema } = Mongoose;

const ratingSchema = new Schema({
  number: Number,
  venueid: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
  },
});



export const Rating = Mongoose.model("Rating", ratingSchema);
