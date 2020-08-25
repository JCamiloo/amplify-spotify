import { Album } from './album.interface';

export interface AlbumsResponse {
  albums: Albums
}

export interface Albums {
  href:     string;
  items:    Album[],
  limit:    number,
  next:     string;
  offset:   number;
  previous: string;
  total:    number;
}