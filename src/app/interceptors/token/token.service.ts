import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { SpotifyService, AuthService } from '../../services';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(
    private spotifySrv: SpotifyService,
    private authSrv: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.spotifySrv.getToken()).pipe(map(token => token.value)).pipe(switchMap(token => {
      if (token && req.url.includes(`${environment.SPOTIFY_URL}`)){
        const headers = new HttpHeaders({'Authorization': 'Bearer ' + token });
        const cloneRequest = req.clone({ headers });
        return next.handle(cloneRequest).pipe(catchError(this.errorHandler.bind(this)));
      } else {
        const cloneRequest = req.clone();
        return next.handle(cloneRequest).pipe(catchError(this.errorHandler.bind(this)));
      }
    }));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.authSrv.signOut();
    }
    return throwError(error);
  }
}
