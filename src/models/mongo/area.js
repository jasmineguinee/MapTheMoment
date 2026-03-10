import Mongoose from "mongoose";

const { Schema } = Mongoose;

const areaSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Area = Mongoose.model("Area", areaSchema);
