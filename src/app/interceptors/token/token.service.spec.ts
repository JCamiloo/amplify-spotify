import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';

describe('TokenService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenService, UrlSerializer]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
