export interface MovieDownload {
  quality: string;
  magnet: string;
  size: string;
  type: string; // e.g. 'WEB', 'BluRay'
  torrentFileData?: string; // Base64 data of the .torrent file
  torrentUrl?: string; // Direct link to a .torrent file
  seeds?: number;
  peers?: number;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  cast?: string[]; 
  coverImage: string;
  backgroundImage?: string;
  description?: string;
  downloads: MovieDownload[];
  language: string;
  dateAdded: string;
  trailerUrl?: string;
}

export interface User {
  username: string;
  role: 'admin' | 'guest';
}

export type Page = 'home' | 'browse' | 'trending' | 'admin' | 'login' | 'details';