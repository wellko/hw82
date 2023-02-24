import {configureStore} from "@reduxjs/toolkit";
import {ArtistPageReducer} from "../features/ArtistPage/ArtistPageSlice";
import {AlbumPageReducer} from "../features/AlbumPage/AlbumPageSlice";
import {TrackPageReducer} from "../features/TracksPage/TrackPageSlice";


export const store = configureStore({
	reducer: {
		artists: ArtistPageReducer,
		albums: AlbumPageReducer,
		tracks: TrackPageReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;