import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {ArtistPageReducer} from "../features/ArtistPage/ArtistPageSlice";
import {AlbumPageReducer} from "../features/AlbumPage/AlbumPageSlice";
import {TrackPageReducer} from "../features/TracksPage/TrackPageSlice";
import {UsersReducer} from "../features/users/UsersSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const usersPersistConfig = {
	key: 'shop:users',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
		artists: ArtistPageReducer,
		albums: AlbumPageReducer,
		tracks: TrackPageReducer,
		users: persistReducer(usersPersistConfig, UsersReducer),
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;