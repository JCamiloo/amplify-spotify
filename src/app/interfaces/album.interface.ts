import { Artist } from './artist.interface';
import { ExternalUrls } from './external_urls.interface';
import { Song } from './song.interface';

export interface Album {
  album_type:             string;
  artists:                Artist[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Images[];
  name:                   string;
  release_date:           Date;
  release_date_precision: string;
  total_tracks:           number;
  type:                   string;
  uri:                    string;
}

export interface AlbumDetail {
  href:     string;
  items:    Song[];
  limit:    number;
  next:     string;
  offset:   number;
  previous: string;
  total:    number;
}

interface Images {
  height: number;
  url:    string;
  width:  number;
}