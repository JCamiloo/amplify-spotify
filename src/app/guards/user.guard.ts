import { Injectable } from '@angular/core';
import { Route, UrlSegment, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(private authSrv: AuthService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSrv.checkToken();
  }
}
