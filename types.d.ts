export interface ArtistData {
    name: string,
    info:string,
    photo: string | null,
}

export interface AlbumData{
    name: string,
    photo: string | null,
    year: string,
    artist: string,
}

export interface TrackData{
    name: string,
    album: string,
    duration: string,
    year: string,
}

export interface findAlbumData extends AlbumData {
    artist: ArtistData
}

export interface findData extends TrackData {
    album: findAlbumData;
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}