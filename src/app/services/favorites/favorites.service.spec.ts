import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from './favorites.service';
import { environment } from 'src/environments/environment';
import { Song } from 'src/app/interfaces';

describe('FavoritesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoritesService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FavoritesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve songs from the api via GET', () => {
    const dummySong: Song[] = [
      {
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0eHQ9o50hj6ZDNBt6Ys1sD'
            },
            href: 'https://api.spotify.com/v1/artists/0eHQ9o50hj6ZDNBt6Ys1sD',
            id: '0eHQ9o50hj6ZDNBt6Ys1sD',
            name: 'Yandel',
            type: 'artist',
            uri: 'spotify:artist:0eHQ9o50hj6ZDNBt6Ys1sD'
          }
        ],
        available_markets: ['AD','AE','AL'],
        disc_number: 1,
        duration_ms: 227718,
        explicit: false,
        external_urls: {
          spotify: 'https://open.spotify.com/track/3nowY0ZuWMuAmmAu1plEBP'
        },
        favorite: false,
        href: 'https://api.spotify.com/v1/tracks/3nowY0ZuWMuAmmAu1plEBP',
        id: '3nowY0ZuWMuAmmAu1plEBP',
        is_local: false,
        name: 'No Te Vayas',
        playing: false,
        preview_url: 'https://p.scdn.co/mp3-preview/4cff20594df15713629cf68b0ec756582f1c6064?cid=a097f2b074f04b1fb725570498f439a3',
        track_number: 3,
        type: 'track',
        uri: 'spotify:track:3nowY0ZuWMuAmmAu1plEBP'
      }
    ];

    service.getFavorites('test').subscribe((favorites) => {
      expect(favorites.length).toBe(1);
    });

    const request = httpTestingController.expectOne(`${environment.AWS_URL}/test`);
    
    expect(request.request.method).toBe('GET');
    
    request.flush(dummySong);
  });
});
