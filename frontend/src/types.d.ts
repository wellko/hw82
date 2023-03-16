export interface Artist {
  name: string;
  photo: string | null;
  info: string;
  _id: string;
  author: string;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  photo: File | null;
  info: string;
}

export interface Album {
  _id: string;
  name: string;
  year: number;
  photo: string | null;
  artist: Artist;
  author: string;
  isPublished: boolean;
}

export interface AlbumMutation {
  name: string;
  year: string;
  photo: File | null;
  artist: string;
}

export interface Track {
  _id: string;
  name: string;
  numberInAlbum: number;
  videoId?: string;
  duration: string;
  album: Album;
  author: string;
  isPublished: boolean;
}

export interface TrackMutation {
  name: string;
  numberInAlbum: number;
  videoId?: string;
  duration: string;
  album: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
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
    };
  };
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
