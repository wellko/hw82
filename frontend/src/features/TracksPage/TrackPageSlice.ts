import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Track} from "../../types";
import {getTracks} from "./TrackPageThunks";

interface Initial {
	tracks: Track[];
	loading: boolean;
}

const initialState: Initial = {
	tracks: [],
	loading: false,
}

export const ArtistPageSlice = createSlice({
	name: 'Track',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTracks.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(getTracks.fulfilled, (state,action) => {
			state.tracks = action.payload;
			state.loading = false;
		})
		builder.addCase(getTracks.rejected, (state) => {
			state.loading = false;
		})
	}
})

export const TrackPageReducer = ArtistPageSlice.reducer;
export const selectStateOfTrack = (state: RootState) => state.tracks.tracks;
export const selectStatusOfTrack = (state: RootState) => state.tracks.loading;
