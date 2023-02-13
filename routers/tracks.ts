import express from "express";
import {TrackData} from "../types";
import Track from "../models/Track";


const trackRouter = express.Router();

trackRouter.post('/', async (req,res) => {
    const newTrackData: TrackData = {
        name: req.body.name,
        duration: req.body.duration? req.body.duration : '',
        album: req.body.album,
        year: req.body.year,
    }
    const track = new Track(newTrackData);
    try {
        await track.save();
        return res.send(track);
    } catch (error) {
        return res.status(400).send(error);
    }
})

trackRouter.get('/', async (req, res) => {
    const queryAlbum = req.query.album as string;
    if (queryAlbum){
        try {
            const track = await Track.find({album: queryAlbum})
            return res.send(track);
        } catch {
            return res.sendStatus(500);
        }
    }else {
        try {
            const track = await Track.find()
            return res.send(track);
        } catch {
            return res.sendStatus(500);
        }
    }
})





export default trackRouter;