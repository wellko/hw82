import {configureStore} from "@reduxjs/toolkit";
import {ArtistPageReducer} from "../features/ArtistPage/ArtistPageSlice";
import {AlbumPageReducer} from "../features/AlbumPage/AlbumPageSlice";
import {TrackPageReducer} from "../features/TracksPage/TrackPageSlice";
import {UsersReducer} from "../features/users/UsersSlice";


export const store = configureStore({
	reducer: {
		artists: ArtistPageReducer,
		albums: AlbumPageReducer,
		tracks: TrackPageReducer,
		users: UsersReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;