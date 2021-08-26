import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFacility } from '../interfaces/facility';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  constructor(private httpClientService: HttpClientService) {}
  getFacilities(): Observable<IFacility[]> {
    const facility = [
      {
        id: '',
        Factory: '',
        Code: '',
        Name: '',
      },
    ];
    return this.httpClientService.get('facilities', facility);
  }
}
