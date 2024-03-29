import express from "express";
import User from "../models/User";
import { Error } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { randomUUID } from "crypto";
import { imagesUpload } from "../multer";
import { promises as fs } from "fs";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/", imagesUpload.single("avatar"), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
    });
    user.generateToken();
    await user.save();
    return res.send({ message: "registration complete!", user });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

usersRouter.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    return res.status(400).send({ error: "Password is wrong" });
  }
  user.generateToken();
  await user.save();
  return res.send({ message: "Username and password correct!", user });
});

usersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send({ error: "Google login error!" });
    }
    const email = payload["email"];
    const googleId = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];
    if (!email) {
      return res
        .status(400)
        .send({ error: "Not enough user data to continue" });
    }
    let user = await User.findOne({ googleID: googleId });
    if (!user) {
      user = new User({
        username: email,
        password: randomUUID(),
        googleID: googleId,
        displayName,
        avatar,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: "Login with Google successful!", user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post("/fb", async (req, res, next) => {
  try {
    let user = await User.findOne({ FaceBookID: req.body.id });
    if (!user) {
      user = new User({
        username: req.body.email,
        password: randomUUID(),
        FaceBookID: req.body.id,
        displayName: req.body.name,
        avatar: req.body.picture.data.url,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: "Login with FaceBook successful!", user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete("/sessions", auth, async (req, res) => {
  const userParams = (req as RequestWithUser).user;
  const user = await User.findOne({ username: userParams.username });
  if (!user) {
    return res.status(400).send({ error: "Username not found" });
  }
  user.generateToken();
  await user.save();
  return res.send({ message: "Log Outed" });
});

export default usersRouter;
