import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import AlbumForm from './components/AlbumForm';

const NewAlbum = () => {
  return (
    <Container>
      <Paper elevation={6} sx={{ paddingY: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }} align="center">
          New album
        </Typography>
        <AlbumForm />
      </Paper>
    </Container>
  );
};

export default NewAlbum;
