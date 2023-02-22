import express from "express";
import {ArtistData, findData, TrackData} from "../types";
import Track from "../models/Track";
import artist from "../models/Artist";
import Artist from "../models/Artist";

const trackRouter = express.Router();

trackRouter.post('/', async (req, res) => {
    const newTrackData: TrackData = {
        name: req.body.name,
        duration: req.body.duration,
        album: req.body.album,
        numberInAlbum: req.body.number,
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
    const queryArtist = req.query.artist as string;

    if (queryArtist) {
        try {
        const artistData = await Artist.find({_id: queryArtist}) as ArtistData[];
        const artistName = artistData[0].name
        const tracksByArtist = await Track.find().populate({
            path: 'album',
            populate: {
                path: 'artist'
            }
        }) as findData[]
        const response = tracksByArtist.filter(track => track.album.artist.name === artistName);
        return res.send(response) }
        catch {
            return res.sendStatus(500);
        }
    }


    const queryAlbum = req.query.album as string;
    let findParams = {};
    if (queryAlbum) {
        findParams = {album: queryAlbum}
    }
    try {
        const track = await Track.find(findParams)
        return res.send(track);
    } catch {
        return res.sendStatus(500);
    }
})

export default trackRouter;