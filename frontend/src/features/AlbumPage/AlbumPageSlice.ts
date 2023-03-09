import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Album } from '../../types';
import { createAlbum, getAlbums } from './AlbumPageThunks';

interface Initial {
  albums: Album[];
  loading: boolean;
  posting: boolean;
}

const initialState: Initial = {
  albums: [],
  loading: false,
  posting: false,
};

export const AlbumPageSlice = createSlice({
  name: 'Album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createAlbum.pending, (state) => {
      state.posting = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.posting = false;
    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.posting = false;
    });
  },
});

export const AlbumPageReducer = AlbumPageSlice.reducer;
export const selectStateOfAlbum = (state: RootState) => state.albums.albums;
export const selectStatusOfAlbum = (state: RootState) => state.albums.loading;
export const selectStatusOfPostingAlbum = (state: RootState) => state.albums.posting;
