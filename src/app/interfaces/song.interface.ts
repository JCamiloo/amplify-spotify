import { Artist } from './artist.interface';
import { ExternalUrls } from './external_urls.interface';

export interface Song {
  artists:           Artist[];
  available_markets: string[];
  disc_number:       number;
  duration_ms:       number;
  explicit:          boolean;
  external_urls:     ExternalUrls;
  favorite:          boolean;
  href:              string;
  id:                string;
  is_local:          boolean;
  name:              string;
  playing:           boolean;
  preview_url:       string;
  track_number:      number;
  type:              string;
  uri:               string;
}