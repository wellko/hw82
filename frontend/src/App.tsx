import React from 'react';
import {Route, Routes} from "react-router-dom";
import ArtistPage from "./features/ArtistPage/ArtistPage";
import AlbumPage from "./features/AlbumPage/AlbumPage";
import TracksPage from "./features/TracksPage/TracksPage";

function App() {
	return (
		<Routes>
			<Route path='/' element=<ArtistPage/>/>
			<Route path='/albums/:id' element=<AlbumPage/>/>
			<Route path='/tracks/:id' element=<TracksPage/>/>
		</Routes>
	);
}

export default App;
