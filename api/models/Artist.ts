import mongoose, { Types } from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;
const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  info: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User not found!",
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;
