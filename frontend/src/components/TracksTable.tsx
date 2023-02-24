import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Track} from "../types";

interface state {
	tracks: Track[],
}

const TracksTable: React.FC<state> = ({tracks}) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>number of track</TableCell>
						<TableCell align="right">name of track</TableCell>
						<TableCell align="right">duration</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tracks.map((el) => (
						<TableRow
							key={el.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{el.numberInAlbum}
							</TableCell>
							<TableCell align="right">{el.name}</TableCell>
							<TableCell align="right">{el.duration}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);}

export default TracksTable;