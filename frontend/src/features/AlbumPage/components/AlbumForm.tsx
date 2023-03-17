import React, { useEffect, useState } from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';
import { AlbumMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { createAlbum } from '../AlbumPageThunks';
import { selectStatusOfPostingAlbum } from '../AlbumPageSlice';
import { getArtists } from '../../ArtistPage/ArtistPageThunks';
import { selectStateOfArtist } from '../../ArtistPage/ArtistPageSlice';

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectStateOfArtist);
  const loading = useAppSelector(selectStatusOfPostingAlbum);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const onSubmit = async (AlbumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(AlbumMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };
  const [state, setState] = useState<AlbumMutation>({
    name: '',
    year: '1900',
    photo: null,
    artist: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value.toString() };
    });
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit(state);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            label="Album name"
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
            id="year"
            label="Year of public"
            value={state.year}
            onChange={inputChangeHandler}
            name="year"
            InputProps={{ inputProps: { min: 1900, max: 2023 } }}
            helperText="year from 1900-2023"
          />
        </Grid>

        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={6}>
            <FileInput label="Image" onChange={fileInputChangeHandler} name="photo" type="image/*" />
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto', width: '60%' }}
            select
            label="Artist"
            name="artist"
            value={state.artist}
            onChange={inputChangeHandler}
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
          <LoadingButton sx={{ margin: 'auto' }} loading={loading} type="submit" color="primary" variant="contained">
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;
