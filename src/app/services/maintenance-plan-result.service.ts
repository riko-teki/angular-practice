import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';

@Injectable({
  providedIn: 'root',
})
export class MaintenancePlanResultService {
  constructor(private httpClientService: HttpClientService) {}

  getMaintenancePlanResult(): Observable<IMaintenancePlanResult[]> {
    return this.httpClientService.getMaintenancePlanResult();
  }
  getMaintenancePlanResultByID(id: string): Observable<IMaintenancePlanResult> {
    return this.httpClientService.getMaintenancePlanResultByID(id);
  }
}
