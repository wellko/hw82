import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Album} from "../../types";
import {getAlbums} from "./AlbumPageThunks";

interface Initial {
	albums: Album[];
	loading: boolean;
}

const initialState: Initial = {
	albums: [],
	loading: false,
}

export const AlbumPageSlice = createSlice({
	name: 'Album',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAlbums.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(getAlbums.fulfilled, (state,action) => {
			state.albums = action.payload;
			state.loading = false;
		})
		builder.addCase(getAlbums.rejected, (state) => {
			state.loading = false;
		})
	}
})

export const AlbumPageReducer = AlbumPageSlice.reducer;
export const selectStateOfAlbum = (state: RootState) => state.albums.albums;
export const selectStatusOfAlbum = (state: RootState) => state.albums.loading;
