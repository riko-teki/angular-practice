import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share, shareReplay } from 'rxjs/operators';
import { ILocation } from '../interfaces/location';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private httpClientService: HttpClientService,
    private authService: AuthService
  ) {}


  location$!: Observable<ILocation[]>;

  getLocation(): Observable<ILocation[]> {
    if (!this.location$) {
      this.location$ = this.httpClientService
        .getLocation(this.authService.signInFactory).pipe(
          shareReplay({bufferSize:1,refCount:true})
        )
    }
    return this.location$;
  }
}
