import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Artist } from '../../types';
import { createArtist, deleteArtist, getArtists, publicArtist } from './ArtistPageThunks';

interface Initial {
  artists: Artist[];
  loading: boolean;
  posting: boolean;
  deleting: boolean;
}

const initialState: Initial = {
  artists: [],
  loading: false,
  posting: false,
  deleting: false,
};

export const ArtistPageSlice = createSlice({
  name: 'Artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    });
    builder.addCase(getArtists.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.posting = false;
    });

    builder.addCase(publicArtist.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(publicArtist.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(publicArtist.rejected, (state) => {
      state.posting = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleting = false;
    });
  },
});

export const ArtistPageReducer = ArtistPageSlice.reducer;
export const selectStateOfArtist = (state: RootState) => state.artists.artists;
export const selectStatusOfArtist = (state: RootState) => state.artists.loading;
export const selectStatusOfPostingArtist = (state: RootState) => state.artists.posting;
export const selectStatusOfDeletingArtist = (state: RootState) => state.artists.deleting;
