import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class WorkManualService {

  constructor(private httpClientService: HttpClientService,
    private authService:AuthService) { }

  getManual(facilityCode: string, fileName: string): Observable<any> {
    return this.httpClientService.getManual(this.authService.signInFactory, facilityCode, fileName)
  }

  getManualNames(facilityCode: string): Observable<string[]> {
    return this.httpClientService.getManualNames(this.authService.signInFactory,facilityCode)
  }

}
