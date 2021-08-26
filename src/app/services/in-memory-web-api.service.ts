import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DepartmentMock } from '../mocks/department-mock';
import { FacilityMock } from '../mocks/facilities-mock';
import { LocationMock } from '../mocks/location-mock';
import { MaintenancePlanResultMock } from '../mocks/maintenance-plan-result-mock';
import { PriorityMock } from '../mocks/priority-mock';
import { UserMock } from '../mocks/user-mock';
import { WorkStatusMock } from '../mocks/workstatus-mock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryWebApiService implements InMemoryDbService{

  //モックデータ
  // 各要素にはidプロパティが必須
  private api: any = {
    //メンテナンス計画情報
    maintenances: MaintenancePlanResultMock,
    workstatuses: WorkStatusMock,
    locations: LocationMock,
    facilities: FacilityMock,
    users: UserMock, 
    departments: DepartmentMock,
    priorities: PriorityMock,
  }

  constructor() { }

  public createDb(): any {
    return this.api;
  }
}
