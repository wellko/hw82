import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";
import {selectUser} from "../users/UsersSlice";
import {selectStateOfHistory, selectStatusOfHistory} from "./TrackHistorySlice";
import {getHistory} from "./TrackHistoryThunks";
import {CircularProgress, Container} from "@mui/material";
import HistoryTable from "../../components/HistoryTable";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const history = useAppSelector(selectStateOfHistory);
    const loading = useAppSelector(selectStatusOfHistory);

    useEffect(() => {
        dispatch(getHistory());
    }, [dispatch]);

    if (!user) {
        return <Navigate to='/login'/>;
    }


    return (
        <Container>
            {loading? <CircularProgress/> :  <HistoryTable history={history}/>}
        </Container>
    );
};

export default TrackHistory;