import express from "express";
import User from "../models/User";
import {Error} from "mongoose";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next)=>{
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }
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