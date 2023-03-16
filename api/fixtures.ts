import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;
  try {
    await db.dropCollection("artists");
    await db.dropCollection("tracks");
    await db.dropCollection("albums");
    await db.dropCollection("users");
    await db.dropCollection("trackhistories");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [user1, user2] = await User.create(
    {
      username: "admin",
      password: "admin",
      displayName: "admin",
      role: "admin",
      token: "admin",
    },
    {
      username: "user",
      password: "user",
      displayName: "user",
      role: "user",
      token: "user",
    }
  );

  const [artist1, artist2, artist3] = await Artist.create(
    {
      name: "Maroon-5",
      photo: "images/5552a635-7f5e-4683-8a7e-e19bb6919be3.jpg",
      info: "American pop-rock group",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Ed Sheeran",
      photo: "images/62fbeea7-f4fc-4d1a-9815-294fd4edf162.jpg",
      info: "English singer-songwriter",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "2pac",
      photo: "images/90c7fcc7-b362-4704-9e63-f8d97da076c8.jpg",
      info: "Raper",
      author: user2._id,
    }
  );

  const [album1, album2, album3, album4, album5] = await Album.create(
    {
      name: "Songs About Jane",
      year: 2002,
      photo: "images/f73f43ad-9260-4c7f-8fcc-9887b35dde5f.jpg",
      artist: artist1._id,
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Hands All Over",
      year: 2010,
      photo: "images/8ca8c379-f401-4336-b405-1b379a7603ef.jpg",
      artist: artist1._id,
      isPublished: true,
      author: user1._id,
    },
    {
      name: "÷",
      year: 2017,
      photo: "images/825fa97f-f0fa-4574-8e7c-f58ba8fad277.png",
      artist: artist2._id,
      isPublished: true,
      author: user1._id,
    },
    {
      name: "=",
      year: 2021,
      photo: "images/ecaf37a0-8418-462c-89e5-5fb9fb6e4f01.jpg",
      artist: artist2._id,
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Me Against the World",
      year: 1995,
      photo: "images/b900f149-55d1-41e9-8208-3368fe227714.jpg",
      artist: artist3._id,
      author: user2._id,
    }
  );

  await Track.create(
    {
      name: "Harder to Breathe",
      duration: "2:53",
      album: album1._id,
      numberInAlbum: 1,
      videoId: "rV8NHsmVMPE",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "This Love",
      duration: "3:26",
      album: album1._id,
      numberInAlbum: 2,
      videoId: "XPpTgCho5ZA",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Shiver",
      duration: "2:59",
      album: album1._id,
      numberInAlbum: 3,
      videoId: "wXpS0eArMVQ",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "She Will Be Loved",
      duration: "4:17",
      album: album1._id,
      numberInAlbum: 4,
      videoId: "nIjVuRTm-dc",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Tangled",
      duration: "3:18",
      album: album1._id,
      numberInAlbum: 5,
      videoId: "2dqri2hjIik	",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Misery",
      duration: "3:36",
      album: album2._id,
      numberInAlbum: 1,
      videoId: "6g6g2mvItp4",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Give a Little More",
      duration: "3:00",
      album: album2._id,
      numberInAlbum: 2,
      videoId: "BP1PsqBmbvM",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Stutter",
      duration: "3:16",
      album: album2._id,
      numberInAlbum: 3,
      videoId: "l9CZr10ebLQ",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Don't Know Nothing",
      duration: "3:19",
      album: album2._id,
      numberInAlbum: 4,
      videoId: "SteFI_xGl90",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Never Gonna Leave This Bed",
      duration: "3:16",
      album: album2._id,
      numberInAlbum: 5,
      videoId: "ADmCFmYLns4",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Eraser",
      duration: "3:42",
      album: album3._id,
      numberInAlbum: 1,
      videoId: "OjGrcJ4lZCc",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Castle on the Hill",
      duration: "4:21",
      album: album3._id,
      numberInAlbum: 2,
      videoId: "K0ibBPhiaG0",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Dive",
      duration: "3:58",
      album: album3._id,
      numberInAlbum: 3,
      videoId: "Wv2rLZmbPMA",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Shape of You",
      duration: "3:53",
      album: album3._id,
      numberInAlbum: 4,
      videoId: "JGwWNGJdvx8",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Perfect",
      duration: "4:23",
      album: album3._id,
      numberInAlbum: 5,
      videoId: "2Vv-BfVoq4g",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Tides",
      duration: "3:15",
      album: album4._id,
      numberInAlbum: 1,
      videoId: "P_kRTqaD8Mc",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Shivers",
      duration: "3:27",
      album: album4._id,
      numberInAlbum: 2,
      videoId: "",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "First Times",
      duration: "3:05",
      album: album4._id,
      numberInAlbum: 3,
      videoId: "",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Bad Habits",
      duration: "3:51",
      album: album4._id,
      numberInAlbum: 4,
      videoId: "",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "Overpass Graffiti",
      duration: "3:56",
      album: album4._id,
      numberInAlbum: 5,
      videoId: "",
      isPublished: true,
      author: user1._id,
    },
    {
      name: "If I Die 2Nite",
      duration: "3:36",
      album: album5._id,
      numberInAlbum: 2,
      videoId: "",
      author: user2._id,
    },
    {
      name: "Dear Mama",
      duration: "3:05",
      album: album5._id,
      numberInAlbum: 9,
      videoId: "",
      author: user2._id,
    },
    {
      name: "Old School",
      duration: "3:59",
      album: album5._id,
      numberInAlbum: 12,
      videoId: "",
      author: user2._id,
    }
  );
  await db.close();
};

run().catch(console.error);
