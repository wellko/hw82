import {configureStore} from "@reduxjs/toolkit";
import {ArtistPageReducer} from "../features/ArtistPage/ArtistPageSlice";
import {AlbumPageReducer} from "../features/AlbumPage/AlbumPageSlice";


export const store = configureStore({
	reducer: {
		artists: ArtistPageReducer,
		albums: AlbumPageReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;