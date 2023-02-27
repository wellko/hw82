import React from 'react';
import {Route, Routes} from "react-router-dom";
import ArtistPage from "./features/ArtistPage/ArtistPage";
import AlbumPage from "./features/AlbumPage/AlbumPage";
import TracksPage from "./features/TracksPage/TracksPage";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import {CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";

function App() {
	return (
		<>
			<CssBaseline/>
				<AppToolbar/>
			<Routes>
				<Route path='/' element=<ArtistPage/>/>
				<Route path='/albums/:id' element=<AlbumPage/>/>
				<Route path='/tracks/:id' element=<TracksPage/>/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
			</Routes>
		</>);
}

export default App;
