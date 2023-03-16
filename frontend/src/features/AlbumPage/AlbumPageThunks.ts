import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumMutation } from '../../types';
import axiosApi from '../../axios-api';

export const getAlbums = createAsyncThunk<Album[], string>('Album/getAll', async (url) => {
  try {
    const response = await axiosApi.get('/albums?artist=' + url);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const createAlbum = createAsyncThunk<Album, AlbumMutation>('Album/new', async (arg) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(arg) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = arg[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    const response = await axiosApi.post('/albums', formData);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const publicAlbum = createAsyncThunk<Album, string>('Album/public', async (arg) => {
  try {
    const response = await axiosApi.patch('/albums/' + arg + '/togglePublished');
    return response.data;
  } catch (e) {
    return e;
  }
});

export const deleteAlbum = createAsyncThunk<Album, string>('Album/delete', async (arg) => {
  try {
    const response = await axiosApi.delete('/albums/' + arg);
    return response.data;
  } catch (e) {
    return e;
  }
});
