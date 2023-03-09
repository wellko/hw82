import express = require("express");
import { imagesUpload } from "../multer";
import Artist from "../models/Artist";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import { HydratedDocument } from "mongoose";
import { ArtistData } from "../types";
import Track from "../models/Track";
import Album from "../models/Album";
import role from "../middleware/role";

const artistRouter = express.Router();

artistRouter.get("/", role,async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    if (user && user.role  === "admin") {
      const artists = await Artist.find();
      return res.send(artists);
    }
    const artists = await Artist.find({ isPublished: true });
    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});

artistRouter.post("/", auth, imagesUpload.single("photo"), async (req, res) => {
  try {
    const artist = await Artist.create({
      name: req.body.name,
      info: req.body.info ? req.body.info : "",
      photo: req.file ? req.file.filename : null,
    });
    return res.send(artist);
  } catch (error) {
    return res.status(400).send(error);
  }
});

artistRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res) => {
    const artist: HydratedDocument<ArtistData> | null = await Artist.findById(
      req.params.id
    );
    if (!artist) {
      return res.sendStatus(404);
    }
    artist.isPublished = !artist.isPublished;
    try {
      await artist.save();
      return res.send(artist);
    } catch {
      return res.sendStatus(500);
    }
  }
);

artistRouter.delete("/:id", auth, permit("admin"), async (req, res) => {
  try {
    const Albums = await Album.find({ artist: req.params.id });
    if (Albums.length) {
      Albums.map(async (el) => await Track.deleteMany({ album: el._id }));
    }
    await Album.deleteMany({ artist: req.params.id });
    await Artist.deleteOne({ _id: req.params.id });
    return res.send({ message: "deleted" });
  } catch {
    return res.sendStatus(500);
  }
});

export default artistRouter;
