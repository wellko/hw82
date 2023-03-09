import React, { useCallback, useEffect } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getArtists } from './ArtistPageThunks';
import { selectStateOfArtist, selectStatusOfArtist } from './ArtistPageSlice';
import ArtistCard from './components/ArtistCard';

const ArtistPage = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectStateOfArtist);
  const loading = useAppSelector(selectStatusOfArtist);

  const callBack = useCallback(async () => {
    await dispatch(getArtists());
  }, [dispatch]);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return (
    <Container fixed>
      <Typography textAlign="center" variant="h1">
        Artists:
      </Typography>
      <Grid container gap={2}>
        {loading ? <CircularProgress /> : artists.map((el) => <ArtistCard key={Math.random()} artist={el} />)}
      </Grid>
    </Container>
  );
};

export default ArtistPage;
