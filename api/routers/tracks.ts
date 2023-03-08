import express from "express";
import {ArtistData, findData, TrackData} from "../types";
import Track from "../models/Track";
import artist from "../models/Artist";
import Artist from "../models/Artist";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import {HydratedDocument} from "mongoose";

const trackRouter = express.Router();

trackRouter.post('/', auth, async (req, res) => {
    const track = await Track.create({
        name: req.body.name,
        duration: req.body.duration,
        album: req.body.album,
        videoId : req.body.videoId? req.body.videoId: undefined,
        numberInAlbum: req.body.number,
    });
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
        const track = await Track.find(findParams).populate({
            path: 'album',
            populate: {
                path: 'artist'
            }
        }).sort({'numberInAlbum': 1})
        return res.send(track);
    } catch {
        return res.sendStatus(500);
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    const track: HydratedDocument<TrackData> | null = await Track.findById(req.params.id);
    if (!track) {
        return res.sendStatus(404);
    }
    track.isPublished = !track.isPublished;
    try {
        track.save();
        return res.send(track);
    } catch {
        return res.sendStatus(500);
    }
});

export default trackRouter;