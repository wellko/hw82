import express from "express";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import trackHistory from "../models/TrackHistory";
import Album from "../models/Album";
import Track from "../models/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/',auth , async (req, res, next)=>{
    const user = (req as RequestWithUser).user;
    const track = await Track.findById(req.body.track)
    const album = await Album.findById(track!.album);
    try {
        const newHistoryItem = new trackHistory({
            user: user._id,
            track: req.body.track,
            artist: album!.artist,
            datetime: Date.now(),
        });
        await newHistoryItem.save();
        return res.send(newHistoryItem);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
})

trackHistoryRouter.get('/', auth, async (req,res,next) => {
    const user = (req as RequestWithUser).user;
    try {
        const trackHistoryRes = await trackHistory.find({user: user._id}).populate('artist').populate('track').sort({"datetime": -1});
        return res.send(trackHistoryRes);
    }catch (error){
        return next(error)
    }
})

export default trackHistoryRouter;