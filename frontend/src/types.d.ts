export interface Artist {
	name: string;
	photo: string;
	info: string;
	_id: string;
}

export interface Album {
	_id: string;
	name: string;
	year: number;
	photo: string;
	artist: Artist;
}

export interface Track {
	_id: string;
	name: string;
	numberInAlbum: number;
	videoId?: string;
	duration: string;
	album: Album;
}

export interface RegisterMutation {
	username: string;
	password: string;
}

export interface User {
	_id: string;
	username: string;
	token: string;
}

export interface RegisterResponse {
	message: string;
	user: User;
}

export interface ValidationError {
	errors: {
		[key: string]: {
			name: string;
			message: string;
		}
	},
	message: string;
	name: string;
	_name: string;
}

export interface LoginMutation {
	username: string;
	password: string;
}

export interface GlobalError {
	error: string;
}

export interface HistoryItem {
	user: string;
	track: Track;
	artist: Artist;
	datetime: string;
}

export interface HistoryData {
	track: string;
}