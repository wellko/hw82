import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/',auth , async (req, res, next)=>{
    const user = (req as RequestWithUser).user;
    try {
        const newHistoryItem = new TrackHistory({
            user: user._id,
            track: req.body.track,
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

export default trackHistoryRouter;