import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPriority } from '../interfaces/priority';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  constructor(private httpClientService: HttpClientService) {}

  getPriorities(): Observable<IPriority[]> {
    const priority = [
      {
        id: '',
        Code: '',
        Name: '',
      },
    ];
    return this.httpClientService.get('priorities',priority)
  }
}
