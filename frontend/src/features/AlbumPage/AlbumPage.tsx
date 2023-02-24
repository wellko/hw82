import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getAlbums} from "./AlbumPageThunks";
import {useParams} from "react-router-dom";
import {selectStateOfAlbum, selectStatusOfAlbum} from "./AlbumPageSlice";
import AlbumCard from "../../components/AlbumCard";

const AlbumPage = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const albums = useAppSelector(selectStateOfAlbum);
	const loading = useAppSelector(selectStatusOfAlbum);

	const callBack = useCallback(async () => {
		await dispatch(getAlbums(id!));
	}, [dispatch, id])

	useEffect(() => {
		callBack();
	}, [callBack])

	let artistName = '';

	if (albums[0]) {
		artistName = albums[0].artist.name;
	}
	return (
		<Container fixed>
			<Typography textAlign='center' variant='h1'>{loading? '' : artistName}</Typography>
			<Grid container gap={2}>
				{loading? <CircularProgress/>:
					albums.map(el => <AlbumCard key={Math.random()} album={el}/>)}
			</Grid>
		</Container>
	);
};

export default AlbumPage;