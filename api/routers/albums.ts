import express from "express";
import { imagesUpload } from "../multer";
import Album from "../models/Album";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import { HydratedDocument } from "mongoose";
import { AlbumData } from "../types";
import Track from "../models/Track";
import role from "../middleware/role";
import { promises as fs } from "fs";

const albumRouter = express.Router();

albumRouter.post("/", auth, imagesUpload.single("photo"), async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    const album = await Album.create({
      name: req.body.name,
      artist: req.body.artist,
      photo: req.file ? req.file.filename : null,
      year: req.body.year,
      author: user._id,
    });
    return res.send(album);
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    return res.status(400).send(error);
  }
});

albumRouter.get("/", role, async (req, res) => {
  try {
    const queryArtist = req.query.artist as string;
    const user = (req as RequestWithUser).user;
    if (queryArtist) {
      if (user && user.role === "admin") {
        const albums = await Album.find({
          artist: queryArtist,
        })
          .populate("artist", "name")
          .sort({ year: -1 });
        return res.send(albums);
      }
      const albums = await Album.find({
        $or: [
          { isPublished: true, artist: queryArtist },
          { author: user?._id, artist: queryArtist },
        ],
      })
        .populate("artist", "name")
        .sort({ year: -1 });
      return res.send(albums);
    } else {
      const albums = await Album.find({
        $or: [{ isPublished: true }, { author: user?._id }],
      })
        .populate("artist", "name")
        .sort({ year: -1 });
      return res.send(albums);
    }
  } catch {
    return res.sendStatus(500);
  }
});

albumRouter.get("/:id", async (req, res) => {
  try {
    const albums = await Album.find({ _id: req.params.id })
      .populate("artist", "name info photo")
      .sort({ year: -1 });
    return res.send(albums);
  } catch {
    return res.sendStatus(500);
  }
});

albumRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res) => {
    const albums: HydratedDocument<AlbumData> | null = await Album.findById(
      req.params.id
    );
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
  }
);

albumRouter.delete("/:id", auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    if (user.role === "admin") {
      const deleted = await Album.deleteOne({ _id: req.params.id });
      if (deleted.deletedCount === 1) {
        await Track.deleteMany({ album: req.params.id });
        return res.send({ message: "deleted" });
      } else {
        return res.send({ message: "cant find album" });
      }
    }
    const deleted = await Album.deleteOne({
      _id: req.params.id,
      author: user._id,
      isPublished: false,
    });
    if (deleted.deletedCount === 1) {
      await Track.deleteMany({ album: req.params.id });
      return res.send({ message: "deleted" });
    } else {
      return res.send({ message: "no permission" });
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default albumRouter;
