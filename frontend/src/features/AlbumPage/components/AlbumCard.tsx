import React from 'react';
import { Album } from '../../../types';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/UsersSlice';
import { LoadingButton } from '@mui/lab';
import { selectStatusOfDeletingAlbum, selectStatusOfPostingAlbum } from '../AlbumPageSlice';
import { deleteAlbum, getAlbums, publicAlbum } from '../AlbumPageThunks';
import noImage from '../../../assets/noimage.jpg';

interface props {
  album: Album;
}

const AlbumCard: React.FC<props> = ({ album }) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectStatusOfPostingAlbum);
  const deleting = useAppSelector(selectStatusOfDeletingAlbum);
  const dispatch = useAppDispatch();
  let ImgUrl;
  if (album.photo) {
    ImgUrl = apiUrl + album.photo;
  } else {
    ImgUrl = noImage;
  }

  const navigate = useNavigate();

  const onPublic = async () => {
    await dispatch(publicAlbum(album._id));
    await dispatch(getAlbums(album.artist._id));
  };

  const onDelete = async () => {
    await dispatch(deleteAlbum(album._id));
    navigate('/');
  };

  const onClickNavigate = () => {
    navigate('/tracks/' + album._id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="200" image={ImgUrl} alt="photo of album" />
      <CardContent>
        <CardActionArea onClick={onClickNavigate}>
          <Typography gutterBottom variant="h5" component="div">
            {album.name}
          </Typography>
        </CardActionArea>
        <Typography variant="body1" color="text.secondary">
          year of realise : {album.year}
        </Typography>
        {!album.isPublished && (
          <Typography variant="body1" color="red">
            Unpublished
          </Typography>
        )}
        {user?.role === 'admin' && !album.isPublished && (
          <Box mb={2}>
            <LoadingButton variant="contained" onClick={onPublic} loading={loading}>
              Public
            </LoadingButton>
          </Box>
        )}
        {user?.role === 'admin' ? (
          <LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
            Delete
          </LoadingButton>
        ) : (
          user &&
          !album.isPublished &&
          user._id === album.author && (
            <LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
              Delete
            </LoadingButton>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
