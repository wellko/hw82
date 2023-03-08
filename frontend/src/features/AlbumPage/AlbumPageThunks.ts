import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axios-api';

export const getAlbums = createAsyncThunk<Album[], string>('Album/getAll', async (url) => {
  try {
    const response = await axiosApi.get('/albums?artist=' + url);
    return response.data;
  } catch (e) {
    return e;
  }
});
