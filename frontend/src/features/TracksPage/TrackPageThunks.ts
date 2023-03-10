import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track, TrackMutation } from '../../types';
import axiosApi from '../../axios-api';

export const getTracks = createAsyncThunk<Track[], string>('Track/getAll', async (id) => {
  try {
    const response = await axiosApi.get('/tracks?album=' + id);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const createTrack = createAsyncThunk<Track, TrackMutation>('Track/new', async (arg) => {
  try {
    const response = await axiosApi.post('/tracks', arg);
    return response.data;
  } catch (e) {
    return e;
  }
});

export const publicTrack = createAsyncThunk<Track, string>('Track/public', async (arg) => {
  try {
    const response = await axiosApi.patch('/tracks/' + arg + '/togglePublished');
    return response.data;
  } catch (e) {
    return e;
  }
});

export const deleteTrack = createAsyncThunk<Track, string>('Track/delete', async (arg) => {
  try {
    const response = await axiosApi.delete('/tracks/' + arg);
    return response.data;
  } catch (e) {
    return e;
  }
});
