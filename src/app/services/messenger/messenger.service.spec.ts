import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from './messenger.service';

describe('MessengerService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: MessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessengerService]
    });
    
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
