import express from "express";
import { ArtistData, findData, TrackData } from "../types";
import Track from "../models/Track";
import artist from "../models/Artist";
import Artist from "../models/Artist";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import { HydratedDocument } from "mongoose";
import role from "../middleware/role";

const trackRouter = express.Router();

trackRouter.post("/", auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;
    const track = await Track.create({
      name: req.body.name,
      duration: req.body.duration,
      album: req.body.album,
      videoId: req.body.videoId ? req.body.videoId : undefined,
      numberInAlbum: req.body.number,
      author: user._id,
    });
    return res.send(track);
  } catch (error) {
    return res.status(400).send(error);
  }
});

trackRouter.get("/", role, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    const queryArtist = req.query.artist as string;
    if (queryArtist) {
      const artistData = (await Artist.find(
        user && user.role === "admin"
          ? {
              _id: queryArtist,
            }
          : {
              _id: queryArtist,
              isPublished: true,
            }
      )) as ArtistData[];
      const artistName = artistData[0].name;
      const tracksByArtist = (await Track.find().populate({
        path: "album",
        populate: {
          path: "artist",
        },
      })) as findData[];
      const response = tracksByArtist.filter(
        user && user.role === "admin"
          ? (track) => track.album.artist.name === artistName
          : (track) => {
              track.album.artist.name === artistName &&
                (track.isPublished || track.author === user?._id);
            }
      );
      return res.send(response);
    }
  } catch {
    return res.sendStatus(500);
  }

  const queryAlbum = req.query.album as string;
  let findParams = {};
  if (queryAlbum) {
    findParams = {
      $or: [
        { album: queryAlbum, isPublished: true },
        { album: queryAlbum, author: user?._id },
      ],
    };
  }
  if (user && user.role === "admin") {
    findParams = {};
    if (queryAlbum) {
      findParams = {
        album: queryAlbum,
      };
    }
  }
  try {
    const track = await Track.find(findParams)
      .populate({
        path: "album",
        populate: {
          path: "artist",
        },
      })
      .sort({ numberInAlbum: 1 });
    return res.send(track);
  } catch {
    return res.sendStatus(500);
  }
});

trackRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res) => {
    const track: HydratedDocument<TrackData> | null = await Track.findById(
      req.params.id
    );
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
  }
);

trackRouter.delete("/:id", auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    if (user.role === "admin") {
      await Track.deleteOne({ _id: req.params.id });
    } else {
      const deleted = await Track.deleteOne({
        _id: req.params.id,
        author: user._id,
        isPublished: false,
      });
      if (deleted.deletedCount === 0) {
        return res.status(404).send({ message: "cant delete" });
      }
    }

    return res.send({ message: "deleted" });
  } catch {
    return res.sendStatus(500);
  }
});

export default trackRouter;
