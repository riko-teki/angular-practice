import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../interfaces/location';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClientService: HttpClientService) {}

  getLocations(): Observable<ILocation[]> {
    const location = [
      {
        id: '',
        Factory: '',
        Code: '',
        Name: '',
        Address: '',
      },
    ];
    return this.httpClientService.get('locations', location);
  }
}
