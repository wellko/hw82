import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArtistPage from './features/ArtistPage/ArtistPage';
import AlbumPage from './features/AlbumPage/AlbumPage';
import TracksPage from './features/TracksPage/TracksPage';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolBar/AppToolBar';
import TrackHistory from './features/TrackHistory/TrackHistory';
import { selectUser } from './features/users/UsersSlice';
import { useAppSelector } from './app/hooks';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NewArtist from './features/ArtistPage/NewArtist';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline />
      <AppToolbar />
      <Routes>
        <Route path="/" element={<ArtistPage />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/tracks/:id" element={<TracksPage />} />
        <Route
          path="/artists/new"
          element={
            <ProtectedRoute isAllowed={Boolean(user)}>
              <NewArtist />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<TrackHistory />} />
      </Routes>
    </>
  );
}

export default App;
