import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Artist} from "../../types";

interface Initial {
	artists: Artist[];
}

const initialState:Initial  = {
	artists: [],
}

export const ArtistPageSlice = createSlice({
	name: 'Artist',
	initialState,
	reducers: {},
	extraReducers: (builder) =>{

	}
})

export const ArtistPageReducer = ArtistPageSlice.reducer;
export const selectStateOfArtist = (state: RootState) => state.artists.artists;

