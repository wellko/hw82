import React from 'react';
import {Route, Routes} from "react-router-dom";
import ArtistPage from "./features/ArtistPage/ArtistPage";
import AlbumPage from "./features/AlbumPage/AlbumPage";

function App() {
	return (
		<Routes>
			<Route path='/' element=<ArtistPage/>/>
			<Route path='/albums/:id' element=<AlbumPage/>/>
		</Routes>
	);
}

export default App;
