import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HistoryData, Track } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/UsersSlice';
import { postHistory } from '../features/TrackHistory/TrackHistoryThunks';
import YouTubeModal from './YouTubeModal';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { selectStatusOfPostingHistory } from '../features/TrackHistory/TrackHistorySlice';
import { LoadingButton } from '@mui/lab';

interface state {
  tracks: Track[];
}

const TracksTable: React.FC<state> = ({ tracks }) => {
  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = React.useState<string>('');
  const posting = useAppSelector(selectStatusOfPostingHistory);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
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
              {user ? <TableCell align="right">Play</TableCell> : ''}
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
                {user ? (
                  <TableCell align="right">
                    <LoadingButton loading={posting} onClick={() => playSong({ track: el._id }, el.videoId)}>
                      {el.videoId ? <YouTubeIcon /> : <PlayCircleIcon />}
                    </LoadingButton>
                  </TableCell>
                ) : (
                  ''
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
