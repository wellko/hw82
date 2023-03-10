import mongoose, { Types } from "mongoose";
import Artist from "./Artist";
import User from "./User";

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    min: 1800,
    max: 2023,
  },
  photo: {
    type: String,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: "Artist does not exist!",
    },
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

const Album = mongoose.model("Album", AlbumSchema);

export default Album;
