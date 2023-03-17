import mongoose from "mongoose";
import express from "express";
import cors = require("cors");
import artistRouter from "./routers/artists";
import albumRouter from "./routers/albums";
import trackRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistory";
import config from "./config";

const app = express();
app.use(express.static("public"));
app.use(cors());
const port = 8000;
app.use(express.json());
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);
app.use("/tracks", trackRouter);
app.use("/users", usersRouter);
app.use("/track_history", trackHistoryRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
