import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HistoryData, Track } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/UsersSlice';
import { postHistory } from '../../TrackHistory/TrackHistoryThunks';
import YouTubeModal from './YouTubeModal';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { selectStatusOfPostingHistory } from '../../TrackHistory/TrackHistorySlice';
import { LoadingButton } from '@mui/lab';
import { selectStatusOfDeletingTrack, selectStatusOfPostingTrack } from '../TrackPageSlice';
import { deleteTrack, getTracks, publicTrack } from '../TrackPageThunks';
import { useNavigate } from 'react-router-dom';

interface state {
  tracks: Track[];
}

const TracksTable: React.FC<state> = ({ tracks }) => {
  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = React.useState<string>('');
  const posting = useAppSelector(selectStatusOfPostingHistory);
  const loading = useAppSelector(selectStatusOfPostingTrack);
  const deleting = useAppSelector(selectStatusOfDeletingTrack);
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const onPublic = async (el: Track) => {
    await dispatch(publicTrack(el._id));
    await dispatch(getTracks(el.album._id));
  };
  const onDelete = async (el: Track) => {
    await dispatch(deleteTrack(el._id));
    navigate('/');
  };
  const playSong = async (data: HistoryData, id: string | undefined) => {
    dispatch(postHistory(data));
    if (id) {
      await setVideo(id);
      await setOpen(true);
    } else {
      alert('Song added to history');
    }
  };
  return (
    <>
      <YouTubeModal open={open} id={video} handleClose={handleClose} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>number of track</TableCell>
              <TableCell align="right">name of track</TableCell>
              <TableCell align="right">duration</TableCell>
              {user && (
                <>
                  <TableCell align="center">Play</TableCell>
                  <TableCell align="center">Delete</TableCell>{' '}
                </>
              )}
              <TableCell>Status</TableCell>
              {user?.role === 'admin' && <TableCell>Public</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((el) => (
              <TableRow key={Math.random()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {el.numberInAlbum}
                </TableCell>
                <TableCell align="right">{el.name}</TableCell>
                <TableCell align="right">{el.duration}</TableCell>
                {user && (
                  <>
                    <TableCell align="center">
                      <LoadingButton
                        disabled={!el.isPublished}
                        loading={posting}
                        onClick={() => playSong({ track: el._id }, el.videoId)}
                      >
                        {el.videoId ? <YouTubeIcon /> : <PlayCircleIcon />}
                      </LoadingButton>
                    </TableCell>
                    <TableCell align="center">
                      <LoadingButton disabled={user.role !== 'admin'} loading={deleting} onClick={() => onDelete(el)}>
                        Delete
                      </LoadingButton>
                    </TableCell>
                  </>
                )}
                <TableCell width="15%">{el.isPublished ? 'Published' : 'Unpublished'}</TableCell>
                {user?.role === 'admin' && (
                  <TableCell>
                    <LoadingButton onClick={() => onPublic(el)} loading={loading}>
                      {' '}
                      toggle{' '}
                    </LoadingButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TracksTable;
