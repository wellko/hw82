import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Artist } from '../../types';
import { getArtists } from './ArtistPageThunks';

interface Initial {
  artists: Artist[];
  loading: boolean;
}

const initialState: Initial = {
  artists: [],
  loading: false,
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
  },
});

export const ArtistPageReducer = ArtistPageSlice.reducer;
export const selectStateOfArtist = (state: RootState) => state.artists.artists;
export const selectStatusOfArtist = (state: RootState) => state.artists.loading;
