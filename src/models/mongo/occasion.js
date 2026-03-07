import Mongoose from "mongoose";

const { Schema } = Mongoose;

const occasionSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Occasion = Mongoose.model("Occasion", occasionSchema);
