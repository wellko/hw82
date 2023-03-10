import React from 'react';
import { Artist } from '../../../types';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/UsersSlice';
import { selectStatusOfDeletingArtist, selectStatusOfPostingArtist } from '../ArtistPageSlice';
import { deleteArtist, getArtists, publicArtist } from '../ArtistPageThunks';

interface state {
  artist: Artist;
}

const ArtistCard: React.FC<state> = ({ artist }) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectStatusOfPostingArtist);
  const deleting = useAppSelector(selectStatusOfDeletingArtist);
  const dispatch = useAppDispatch();
  const ImgUrl = apiUrl + artist.photo;
  const navigate = useNavigate();

  const onPublic = async () => {
    await dispatch(publicArtist(artist._id));
    await dispatch(getArtists());
  };

  const onDelete = async () => {
    await dispatch(deleteArtist(artist._id));
    await dispatch(getArtists());
  };

  const onClickNavigate = () => {
    navigate('/albums/' + artist._id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="200" image={ImgUrl} alt="photo of artist" />
      <CardContent>
        <CardActionArea onClick={onClickNavigate}>
          <Typography gutterBottom variant="h5" component="div">
            {artist.name}
          </Typography>
        </CardActionArea>
        <Typography variant="body2" color="text.secondary">
          {artist.info}
        </Typography>
        {!artist.isPublished && (
          <Typography variant="body1" color="red">
            Unpublished
          </Typography>
        )}
        {user?.role === 'admin' && (
          <Box mb={2}>
            <LoadingButton variant="contained" onClick={onPublic} loading={loading}>
              Publish toggle
            </LoadingButton>
          </Box>
        )}
        {user && !artist.isPublished && (
          <LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
            Delete
          </LoadingButton>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
