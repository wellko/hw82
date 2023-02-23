import React from 'react';
import {Route, Routes} from "react-router-dom";
import ArtistPage from "./features/ArtistPage/ArtistPage";

function App() {
	return (
		<Routes>
			<Route path='/' element=<ArtistPage/>/>
		</Routes>
	);
}

export default App;
