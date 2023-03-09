import React, { useEffect, useState } from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';
import { TrackMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { getArtists } from '../../ArtistPage/ArtistPageThunks';
import { selectStateOfArtist } from '../../ArtistPage/ArtistPageSlice';
import { selectStatusOfPostingTrack } from '../TrackPageSlice';
import { getAlbums } from '../../AlbumPage/AlbumPageThunks';
import { createTrack } from '../TrackPageThunks';
import { selectStateOfAlbum } from '../../AlbumPage/AlbumPageSlice';

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectStateOfArtist);
  const album = useAppSelector(selectStateOfAlbum);
  const loading = useAppSelector(selectStatusOfPostingTrack);

  const [state, setState] = useState<TrackMutation>({
    name: '',
    numberInAlbum: 0,
    duration: '',
    album: '',
  });

  const [artist, setArtist] = useState<{ artist: string }>({
    artist: '',
  });

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAlbums(artist.artist));
  }, [dispatch, artist]);

  const onSubmit = async (TrackMutation: TrackMutation) => {
    try {
      await dispatch(createTrack(TrackMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };

  const inputChangeHandlerArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtist((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit(state);
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            label="Track name"
            name="name"
            value={state.name}
            onChange={inputChangeHandler}
            required
          />
        </Grid>

        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            type="number"
            required
            id="numberInAlbum"
            label="number in Album"
            value={state.numberInAlbum}
            onChange={inputChangeHandler}
            name="numberInAlbum"
          />
        </Grid>

        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            label="Duration of track"
            name="duration"
            value={state.duration}
            onChange={inputChangeHandler}
            required
          />
        </Grid>

        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            select
            label="Artist"
            name="artist"
            value={artist.artist}
            onChange={inputChangeHandlerArtist}
            required
          >
            <MenuItem value="" disabled>
              Please select a Artist
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            select
            label="Album"
            name="album"
            value={state.album}
            onChange={inputChangeHandler}
            disabled={Boolean(!artist.artist)}
            required
          >
            <MenuItem value="" disabled>
              Please select a Album
            </MenuItem>
            {album.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid container item xs={12}>
          <LoadingButton sx={{ margin: 'auto' }} loading={loading} type="submit" color="primary" variant="contained">
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;
