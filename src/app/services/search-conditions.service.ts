import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchConditions } from '../classes/searchconditions';
import { DepartmentService } from './department.service';
import { FacilityService } from './facility.service';
import { LocationService } from './location.service';
import { PriorityService } from './priority.service';
import { UserService } from './user.service';
import { WorkstatusService } from './workstatus.service';

@Injectable({
  providedIn: 'root',
})
export class SearchConditionsService {
  searchConditions: SearchConditions = new SearchConditions();

  public searchConditionsSubject = new BehaviorSubject<SearchConditions>(
    this.searchConditions
  );

  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private facilityService: FacilityService,
    private workStatusService: WorkstatusService,
    private departmentService: DepartmentService,
    private priorityService: PriorityService
  ) {
    //作業状況一覧を取得し、バインドプロパティへ設定
    this.workStatusService.getWorkStatuses().subscribe((data) => {
      this.searchConditions.allWorkStatuses = [...data];
      this.searchConditionsSubject.next(this.searchConditions);
    });
    //部署一覧を取得し、バインドプロパティへ設定
    this.departmentService.getDepartments().subscribe((data) => {
      this.searchConditions.allDepartments = data;
      this.searchConditionsSubject.next(this.searchConditions);
    });
    // 担当者一覧を取得し、バインドプロパティへ設定
    this.userService.getUsers().subscribe((data) => {
      this.searchConditions.allUsers = [...data];
      this.searchConditionsSubject.next(this.searchConditions);
    });
    //場所一覧を取得し、バインドプロパティへ設定
    this.locationService.getLocations().subscribe((data) => {
      this.searchConditions.allLocations = [...data];
      this.searchConditionsSubject.next(this.searchConditions);
    });
    //設備一覧を取得し、バインドプロパティへ設定
    this.facilityService.getFacilities().subscribe((data) => {
      this.searchConditions.allFacilities = [...data];
      this.searchConditionsSubject.next(this.searchConditions);
    });
    //優先度一覧を取得し、バインドプロパティへ設定
    this.priorityService.getPriorities().subscribe((data) => {
      this.searchConditions.allPriorities = [...data];
      this.searchConditionsSubject.next(this.searchConditions);
    });
  }

  //検索条件の変更通知
  public onNotifySearchConditionsChanged(after: SearchConditions) {
    console.log('onNotifySearchConditionsChanged!\n');
    this.searchConditionsSubject.next(after);
  }
}
