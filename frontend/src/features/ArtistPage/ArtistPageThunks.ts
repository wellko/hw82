import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import axiosApi from "../../axios-api";


export const getArtists = createAsyncThunk<Artist[]>(
	'Artist/getAll',
	async () => {
		try{
			const response = await axiosApi.get('/artists');
			return response.data
		} catch (e) {
			return  e
		}
	}
)