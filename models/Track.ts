import mongoose, {Types} from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Album.findById(value),
            message: 'Artist does not exist!',
        }
    }
});


const Track = mongoose.model('Track', TrackSchema);

export default Track;