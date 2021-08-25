import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IFacility } from '../interfaces/facility';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  constructor(
    private httpClientService: HttpClientService,
    private authService: AuthService
  ) {}

  facility$!: Observable<IFacility[]>;

  getFacility(): Observable<IFacility[]> {
    if (!this.facility$) {
      this.facility$ = this.httpClientService
        .getFacility(
          this.authService.signInFactory,
          this.authService.signInDept
        )
        .pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    return this.facility$;
  }
}
