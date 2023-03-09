import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import TrackForm from './components/TrackForm';

const NewAlbum = () => {
  return (
    <Container>
      <Paper elevation={6} sx={{ paddingY: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }} align="center">
          New track
        </Typography>
        <TrackForm />
      </Paper>
    </Container>
  );
};

export default NewAlbum;
