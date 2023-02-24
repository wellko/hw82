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