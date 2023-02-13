import express from "express";
import {imagesUpload} from "../multer";
import {AlbumData} from "../types";
import Album from "../models/Album";
import album from "../models/Album";

const albumRouter = express.Router();

albumRouter.post('/', imagesUpload.single('photo'), async (req, res) => {
    const newAlbumData: AlbumData = {
        name: req.body.name,
        artist: req.body.artist,
        photo: req.file ? req.file.filename : null,
        year: req.body.year ? req.body.year : '',
    }
    const album = new Album(newAlbumData);
    try {
        await album.save();
        return res.send(album);
    } catch (error) {
        return res.status(400).send(error);
    }
});

albumRouter.get('/', async (req, res) => {
    const queryArtist = req.query.artist as string;
    if (queryArtist) {
        try {
            const albums = await album.find({artist: queryArtist})
            return res.send(albums);
        } catch {
            return res.sendStatus(500);
        }
    } else {
        try {
            const albums = await album.find()
            return res.send(albums);
        } catch {
            return res.sendStatus(500);
        }
    }
});

albumRouter.get('/:id', async (req, res) => {
    try {
        const albums = await album.find({_id: req.params.id}).populate('artist', 'name info photo')
        console.log(albums)
        return res.send(albums);
    } catch {
        return res.sendStatus(500);
    }
})

export default albumRouter;