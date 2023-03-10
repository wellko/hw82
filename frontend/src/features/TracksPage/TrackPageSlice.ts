import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Track } from '../../types';
import { createTrack, deleteTrack, getTracks, publicTrack } from './TrackPageThunks';

interface Initial {
  tracks: Track[];
  loading: boolean;
  posting: boolean;
  deleting: boolean;
}

const initialState: Initial = {
  tracks: [],
  loading: false,
  posting: false,
  deleting: false,
};

export const ArtistPageSlice = createSlice({
  name: 'Track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
      state.loading = false;
    });
    builder.addCase(getTracks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createTrack.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.posting = false;
    });

    builder.addCase(publicTrack.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(publicTrack.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(publicTrack.rejected, (state) => {
      state.posting = false;
    });

    builder.addCase(deleteTrack.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deleteTrack.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteTrack.rejected, (state) => {
      state.deleting = false;
    });
  },
});

export const TrackPageReducer = ArtistPageSlice.reducer;
export const selectStateOfTrack = (state: RootState) => state.tracks.tracks;
export const selectStatusOfTrack = (state: RootState) => state.tracks.loading;
export const selectStatusOfPostingTrack = (state: RootState) => state.tracks.posting;
export const selectStatusOfDeletingTrack = (state: RootState) => state.tracks.deleting;
