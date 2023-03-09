import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistMutation } from '../../types';
import axiosApi from '../../axios-api';

export const getArtists = createAsyncThunk<Artist[]>('Artist/getAll', async () => {
  try {
    const response = await axiosApi.get('/artists');
    return response.data;
  } catch (e) {
    return e;
  }
});

export const createArtist = createAsyncThunk<Artist, ArtistMutation>('Artist/new', async (arg) => {
  try {
    const response = await axiosApi.post('artists', arg);
    return response.data;
  } catch (e) {
    return e;
  }
});
