import express = require("express");
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import artist from "../models/Artist";
import {ArtistData} from "../types";

const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
        try {
            const artists = await artist.find()
            return res.send(artists);
        } catch {
            return res.sendStatus(500);
        }
})

artistRouter.post('/', imagesUpload.single('photo'), async (req,res) => {
    const newArtistData:ArtistData = {
        name: req.body.name,
        info: req.body.info? req.body.info: '',
        photo: req.file ? req.file.filename : null,
    }
    const artist = new Artist(newArtistData);
    try {
        await artist.save();
        return res.send(artist);
    } catch (error) {
        return res.status(400).send(error);
    }
});

export default  artistRouter;