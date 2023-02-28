import mongoose, {Types} from "mongoose";
import User from "./User";
import Track from "./Track";
import Artist from "./Artist";

const Schema = mongoose.Schema;
const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Track.findById(value),
            message: 'Track does not exist!',
        }
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Artist.findById(value),
            message: 'Artist does not exist!',
        }
    },
    datetime: {
        type: Date,
        required: true,
}});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;