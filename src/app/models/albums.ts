import { Album } from './album';

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