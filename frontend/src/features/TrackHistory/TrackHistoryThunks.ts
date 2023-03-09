import { createAsyncThunk } from '@reduxjs/toolkit';
import { HistoryData, HistoryItem } from '../../types';
import axiosApi from '../../axios-api';
import { RootState } from '../../app/store';

export const getHistory = createAsyncThunk<HistoryItem[], void, { state: RootState }>(
  'History/getAll',
  async (_, { getState }) => {
    const user = getState().users.user;
    if (user) {
      try {
        const response = await axiosApi.get('/track_history', {
          headers: { Authorization: user.token },
        });
        return response.data;
      } catch (e) {
        return e;
      }
    }
  },
);

export const postHistory = createAsyncThunk<void, HistoryData, { state: RootState }>(
  'History/post',
  async (data, { getState }) => {
    const user = getState().users.user;
    if (user) {
      try {
        const response = await axiosApi.post('/track_history', data, {
          headers: { Authorization: user.token },
        });
        return response.data;
      } catch (e) {
        return e;
      }
    }
  },
);
