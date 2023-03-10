import mongoose, { Types } from "mongoose";
import Album from "./Album";
import User from "./User";

const Schema = mongoose.Schema;
const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
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
  videoId: {
    type: String,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: "Artist does not exist!",
    },
  },
  numberInAlbum: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model("Track", TrackSchema);

export default Track;
