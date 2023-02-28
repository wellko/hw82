import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {HistoryItem} from "../types";
import dayjs from "dayjs";

interface state {
    history: HistoryItem[],
}

const TracksTable: React.FC<state> = ({history}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Artist</TableCell>
                        <TableCell align="right">name of track</TableCell>
                        <TableCell align="right">listened</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((el) => (
                        <TableRow
                            key={Math.random()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {el.artist.name}
                            </TableCell>
                            <TableCell align="right">{el.track.name}</TableCell>
                            <TableCell align="right">{dayjs(el.datetime).format('YYYY.MM.DD HH:mm:ss')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );}

export default TracksTable;