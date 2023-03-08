import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import YouTube, {YouTubeProps} from "react-youtube";
import {Button} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
};

const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
        host: 'http://www.youtube.com',
        origin: window.location.hostname,
        autoplay: 1,
        controls: 0,
        autohide: 1,
        wmode: 'opaque',
    },
};

interface props {
    open: boolean;
    id?: string;
    handleClose: React.MouseEventHandler;
}

const YouTubeModal: React.FC<props> = ({open, id,handleClose}) =>  {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Button  onClick={handleClose}>X</Button>
                    <YouTube videoId={id} opts={opts} onReady={onPlayerReady}/>
                </Box>
            </Modal>
        </div>
    );
}

export default YouTubeModal