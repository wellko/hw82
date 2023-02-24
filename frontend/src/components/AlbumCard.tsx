import React from 'react';
import {Album} from "../types";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../constants";

interface state {
	album: Album,
}

const AlbumCard:React.FC<state> = ({album}) => {
	const ImgUrl = apiUrl + album.photo

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
						{album.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{album.year}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AlbumCard;