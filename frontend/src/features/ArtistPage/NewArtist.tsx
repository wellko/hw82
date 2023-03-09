import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import ArtistForm from './components/ArtistForm';

const NewArtist = () => {
  return (
    <Container>
      <Paper elevation={6} sx={{ paddingY: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }} align="center">
          New artist
        </Typography>
        <ArtistForm />
      </Paper>
    </Container>
  );
};

export default NewArtist;
