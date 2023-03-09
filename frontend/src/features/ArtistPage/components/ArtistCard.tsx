import React from 'react';
import { Artist } from '../../../types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';

interface state {
  artist: Artist;
}

const ArtistCard: React.FC<state> = ({ artist }) => {
  const ImgUrl = apiUrl + artist.photo;
  const navigate = useNavigate();
  const onClickNavigate = () => {
    navigate('/albums/' + artist._id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onClickNavigate}>
        <CardMedia component="img" height="200" image={ImgUrl} alt="photo of artist" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {artist.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;
