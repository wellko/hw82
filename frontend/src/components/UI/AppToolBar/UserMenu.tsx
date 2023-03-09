import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { logOut } from '../../../features/users/UsersSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}
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
            dispatch(logOut());
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
