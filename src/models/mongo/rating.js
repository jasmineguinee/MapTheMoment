import Mongoose from "mongoose";

const { Schema } = Mongoose;

const ratingSchema = new Schema({
  number: Number,
  userid: String,
  venueid: {
    type: Schema.Types.ObjectId,
    ref: "Venue", 
   
  },
});



export const Rating = Mongoose.model("Rating", ratingSchema);
