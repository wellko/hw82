import React from 'react';
import {Artist} from "../types";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../constants";

interface state {
	artist: Artist,
}

const ArtistCard:React.FC<state> = ({artist}) => {
	const ImgUrl = apiUrl + artist.photo

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="200"
					image={ImgUrl}
					alt="photo of artist"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{artist.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{artist.info}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ArtistCard;