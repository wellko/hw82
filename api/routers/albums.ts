import express from "express";
import { imagesUpload } from "../multer";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import { HydratedDocument } from "mongoose";
import { AlbumData } from "../types";
import Track from "../models/Track";
import role from "../middleware/role";

const albumRouter = express.Router();

albumRouter.post("/", auth, imagesUpload.single("photo"), async (req, res) => {
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

albumRouter.get("/",role, async (req, res) => {
  try {
    const queryArtist = req.query.artist as string;
    const user = (req as RequestWithUser).user;
    if (queryArtist) {
      if (user && user.role  === "admin") {
        const albums = await Album.find({
          artist: queryArtist,
        })
            .populate("artist", "name")
            .sort({ year: -1 });
        return res.send(albums);
      }
      const albums = await Album.find({
        isPublished: true,
        artist: queryArtist,
      })
        .populate("artist", "name")
        .sort({ year: -1 });
      return res.send(albums);
    } else {
      const albums = await Album.find({ isPublished: true })
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

albumRouter.delete("/:id", auth, permit("admin"), async (req, res) => {
  try {
    await Track.deleteMany({ album: req.params.id });
    await Album.deleteOne({ _id: req.params.id });
    return res.send({ message: "deleted" });
  } catch {
    return res.sendStatus(500);
  }
});

export default albumRouter;
