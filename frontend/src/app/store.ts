import {configureStore} from "@reduxjs/toolkit";
import {ArtistPageReducer} from "../features/ArtistPage/ArtistPageSlice";


export const store = configureStore({
	reducer: {
		artists: ArtistPageReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;