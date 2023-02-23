import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
	await mongoose.connect(config.db);
	const db = mongoose.connection;
	try {
		await db.dropCollection('artists');
		await db.dropCollection('tracks');
		await db.dropCollection('albums');
	} catch (e) {
		console.log('Collections were not present, skipping drop...');
	}

	const [artist1, artist2] = await Artist.create({
		name: "Maroon-5",
		photo: "images/5552a635-7f5e-4683-8a7e-e19bb6919be3.jpg",
		info: "American pop-rock group"
	}, {
		name: "Ed Sheeran",
		photo: "images/62fbeea7-f4fc-4d1a-9815-294fd4edf162.jpg",
		info: "English singer-songwriter"
	});

	const [album1, album2, album3, album4] = await Album.create({
			name: "Songs About Jane",
			year: 2002,
			photo: "images/f73f43ad-9260-4c7f-8fcc-9887b35dde5f.jpg",
			arist: artist1._id
		},
		{
			name: "Hands All Over",
			year: 2010,
			photo: "images/8ca8c379-f401-4336-b405-1b379a7603ef.jpg",
			arist: artist1._id
		},
		{
			name: "÷",
			year: 2017,
			photo: "images/825fa97f-f0fa-4574-8e7c-f58ba8fad277.png",
			arist: artist2._id
		},
		{
			name: "=",
			year: 2021,
			photo: "images/ecaf37a0-8418-462c-89e5-5fb9fb6e4f01.jpg",
			arist: artist2._id
		},);

	await Track.create(
		{
			name: "Harder to Breathe",
			duration: "2:53",
			album: album1._id,
			numberInAlbum: 1
		},
		{
			name: "This Love",
			duration: "3:26",
			album: album1._id,
			numberInAlbum: 2
		},
		{
			name: "Shiver",
			duration: "2:59",
			album: album1._id,
			numberInAlbum: 3
		},
		{
			name: "She Will Be Loved",
			duration: "4:17",
			album: album1._id,
			numberInAlbum: 4
		},
		{
			name: "Tangled",
			duration: "3:18",
			album: album1._id,
			numberInAlbum: 5
		},
		{
			name: "Misery",
			duration: "3:36",
			album: album2._id,
			numberInAlbum: 1
		},
		{
			name: "Give a Little More",
			duration: "3:00",
			album: album2._id,
			numberInAlbum: 2
		},
		{
			name: "Stutter",
			duration: "3:16",
			album: album2._id,
			numberInAlbum: 3
		},
		{
			name: "Don't Know Nothing",
			duration: "3:19",
			album: album2._id,
			numberInAlbum: 4
		},
		{
			name: "Never Gonna Leave This Bed",
			duration: "3:16",
			album: album2._id,
			numberInAlbum: 5
		},
		{
			name: "Eraser",
			duration: "3:42",
			album: album3._id,
			numberInAlbum: 1
		},
		{
			name: "Castle on the Hill",
			duration: "4:21",
			album: album3._id,
			numberInAlbum: 2
		},
		{
			name: "Dive",
			duration: "3:58",
			album: album3._id,
			numberInAlbum: 3
		},
		{
			name: "Shape of You",
			duration: "3:53",
			album: album3._id,
			numberInAlbum: 4
		},
		{
			name: "Perfect",
			duration: "4:23",
			album: album3._id,
			numberInAlbum: 5
		},
		{
			name: "Tides",
			duration: "3:15",
			album: album4._id,
			numberInAlbum: 1
		},
		{
			name: "Shivers",
			duration: "3:27",
			album: album4._id,
			numberInAlbum: 2
		},
		{
			name: "First Times",
			duration: "3:05",
			album: album4._id,
			numberInAlbum: 3
		},
		{
			name: "Bad Habits",
			duration: "3:51",
			album: album4._id,
			numberInAlbum: 4
		},
		{
			name: "Overpass Graffiti",
			duration: "3:56",
			album: album4._id,
			numberInAlbum: 5
		},
	)
	await db.close();
};

run().catch(console.error);
