import { Artist } from './artist';
import { ExternalUrls } from './external_urls';

export interface Song {
  artists:           Artist[];
  available_markets: string[];
  photo:             string;
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