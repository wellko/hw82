import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { ArtistMutation } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { createArtist } from '../ArtistPageThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { selectStatusOfPostingArtist } from '../ArtistPageSlice';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectStatusOfPostingArtist);
  const onSubmit = async (productMutation: ArtistMutation) => {
    try {
      await dispatch(createArtist(productMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };
  const [state, setState] = useState<ArtistMutation>({
    name: '',
    info: '',
    photo: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
            sx={{ margin: 'auto' }}
            label="Artist name"
            name="name"
            value={state.name}
            onChange={inputChangeHandler}
            required
          />
        </Grid>

        <Grid container item xs={12}>
          <TextField
            sx={{ margin: 'auto' }}
            multiline
            rows={3}
            id="info"
            label="Information about artist"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
          />
        </Grid>

        <Grid container item xs={12}>
          <FileInput label="Image" onChange={fileInputChangeHandler} name="photo" type="image/*" />
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

export default ArtistForm;
