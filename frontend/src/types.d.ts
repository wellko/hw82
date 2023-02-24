export interface Artist {
	name: string,
	photo: string,
	info: string,
	_id: string,
}

export interface Album {
	_id: string,
	name: string,
	year: number,
	photo: string,
	artist: Artist
}

export interface Track {
	_id: string,
	name: string,
	numberInAlbum: number,
	duration: string,
	album: Album
}