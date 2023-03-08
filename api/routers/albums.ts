import express from "express";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import {HydratedDocument} from "mongoose";
import {AlbumData} from "../types";

const albumRouter = express.Router();

albumRouter.post('/', auth, imagesUpload.single('photo'), async (req, res) => {
	try {
		const album = await Album.create({
			name: req.body.name,
			artist: req.body.artist,
			photo: req.file ? req.file.filename : null,
			year: req.body.year,
		});
		return res.send(album);
	} catch (error) {
		return res.status(400).send(error);
	}
});

albumRouter.get('/', async (req, res) => {
	const queryArtist = req.query.artist as string;
	let findParams = {};
	if (queryArtist) {
		findParams = {artist: queryArtist}
	}
	try {
		const albums = await Album.find(findParams).populate('artist', 'name').sort({"year": -1});
		return res.send(albums);
	} catch {
		return res.sendStatus(500);
	}
});

albumRouter.get('/:id', async (req, res) => {
	try {
		const albums = await Album.find({_id: req.params.id}).populate('artist', 'name info photo').sort({"year": -1});
		return res.send(albums);
	} catch {
		return res.sendStatus(500);
	}
});

albumRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
	const albums: HydratedDocument<AlbumData> | null = await Album.findById(req.params.id);
	if (!albums) {
		return res.sendStatus(404);
	}
	albums.isPublished = !albums.isPublished;
	try {
		albums.save();
		return res.send(albums);
	} catch {
		return res.sendStatus(500);
	}
});

export default albumRouter;