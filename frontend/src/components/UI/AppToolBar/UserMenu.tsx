import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { getArtists } from '../../../features/ArtistPage/ArtistPageThunks';
import { logoutAction } from '../../../features/users/UsersThunks';
import { apiUrl } from '../../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  let imageUrl = '';
  if (user.avatar) {
    imageUrl = user.avatar;
  }

  if (user.avatar?.indexOf('images') !== -1) {
    imageUrl = apiUrl + user.avatar;
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <img alt="avatar" src={user.avatar ? imageUrl : undefined} width="50px" height="50px" />
      <Button sx={{ paddingBottom: '10px' }} onClick={handleClick} color="inherit">
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate('/history');
          }}
        >
          Track History
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/artists/new');
          }}
        >
          Add artist
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/albums/new');
          }}
        >
          Add album
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/tracks/new');
          }}
        >
          Add track
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await dispatch(logoutAction());
            await dispatch(getArtists());
            navigate('/');
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
