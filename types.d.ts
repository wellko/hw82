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