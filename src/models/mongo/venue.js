import Mongoose from "mongoose";

const { Schema } = Mongoose;

const venueSchema = new Schema({
  title: String,
  venuetype: String,
  description: String,
  latitude: Number,
  longitude: Number,
  areaid: {
    type: Schema.Types.ObjectId,
    ref: "Area",
  },
});

export const Venue = Mongoose.model("Venue", venueSchema);
