import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import TracksTable from "../../components/TracksTable";
import {selectStateOfTrack, selectStatusOfTrack} from "./TrackPageSlice";
import {getTracks} from "./TrackPageThunks";
import {useParams} from "react-router-dom";

const TrackPage = () => {
	const dispatch = useAppDispatch();
	const tracks = useAppSelector(selectStateOfTrack);
	const loading = useAppSelector(selectStatusOfTrack);
	const {id} = useParams();

	const callBack = useCallback(async () => {
		await dispatch(getTracks(id!));
	}, [dispatch, id])

	useEffect(() => {
		callBack();
	}, [callBack])

	let artistName = '';
	let albumName= '';

	if (tracks[0]) {
		artistName = tracks[0].album.artist.name;
		albumName = tracks[0].album.name;
	}

	return (
		<Container fixed>
			<Typography textAlign='center' variant='h1'>{artistName}</Typography>
			<Typography textAlign='center' variant='h3'>{albumName}</Typography>
			<Grid container gap={2}>
				{loading? <CircularProgress/>:
					<TracksTable tracks={tracks}/>}
			</Grid>
		</Container>
	);
};

export default TrackPage;