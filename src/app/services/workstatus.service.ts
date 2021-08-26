import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkstatus } from '../interfaces/workstatus';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class WorkstatusService {

  constructor(private httpClientService: HttpClientService) {}

  getWorkStatuses(): Observable<IWorkstatus[]>{
    const workStatus = [{
      id: '',
      Name: ''
    }]
    return this.httpClientService.get('workstatuses',workStatus)
  }
}
