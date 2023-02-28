import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {HistoryItem} from "../../types";
import {getHistory, postHistory} from "./TrackHistoryThunks";

interface Initial {
	history: HistoryItem[];
	loading: boolean;
	posting: boolean;
}

const initialState: Initial = {
	history: [],
	loading: false,
	posting: false
}

export const HistorySlice = createSlice({
	name: 'History',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getHistory.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(getHistory.fulfilled, (state,action) => {
			state.history = action.payload;
			state.loading = false;
		})
		builder.addCase(getHistory.rejected, (state) => {
			state.loading = false;
		})
		builder.addCase(postHistory.pending, (state) => {
			state.posting = true;
		})
		builder.addCase(postHistory.fulfilled, (state) => {
			state.posting = false;
		})
		builder.addCase(postHistory.rejected, (state) => {
			state.posting = false;
		})
	}
})

export const HistoryReducer = HistorySlice.reducer;
export const selectStateOfHistory = (state: RootState) => state.history.history;
export const selectStatusOfHistory = (state: RootState) => state.history.loading;
export const selectStatusOfPostingHistory = (state: RootState) => state.history.posting;
