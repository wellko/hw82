export interface ArtistData {
  name: string;
  info: string;
  photo: string | null;
  isPublished: boolean;
  author: Types.ObjectId;
}

export interface AlbumData {
  name: string;
  photo: string | null;
  year: string;
  artist: string;
  isPublished: boolean;
  author: Types.ObjectId;
}

export interface TrackData {
  name: string;
  album: string;
  duration: string;
  numberInAlbum: number;
  videoId?: string;
  isPublished: boolean;
  author: Types.ObjectId;
}

export interface findAlbumData extends AlbumData {
  artist: ArtistData;
}

export interface findData extends TrackData {
  album: findAlbumData;
  author: Types.ObjectId;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
  avatar?: string;
}
