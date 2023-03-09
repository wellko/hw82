import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Artist } from '../../types';
import { createArtist, getArtists } from './ArtistPageThunks';

interface Initial {
  artists: Artist[];
  loading: boolean;
  posting: boolean;
}

const initialState: Initial = {
  artists: [],
  loading: false,
  posting: false,
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
  },
});

export const ArtistPageReducer = ArtistPageSlice.reducer;
export const selectStateOfArtist = (state: RootState) => state.artists.artists;
export const selectStatusOfArtist = (state: RootState) => state.artists.loading;
export const selectStatusOfPostingArtist = (state: RootState) => state.artists.posting;
