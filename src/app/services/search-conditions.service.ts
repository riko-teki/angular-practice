import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchConditions } from '../classes/searchconditions';
import { AuthService } from './auth.service';
import { FacilityService } from './facility.service';
import { GenericMasterService } from './generic-master.service';
import { LocationService } from './location.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SearchConditionsService {
  searchConditions: SearchConditions = new SearchConditions();

  public searchConditionsSubject = new BehaviorSubject<SearchConditions>(
    this.searchConditions
  );

  constructor(
    private genericMasterService: GenericMasterService,
    private locationService: LocationService,
    private userService: UserService,
    private facilityService: FacilityService,
    private authService: AuthService
  ) {
    //管理者でログイン時は自分担当のトグルをFALSEにする
    if (this.authService.isManager) {
      this.searchConditions.isChargePerson = false;
    }
    //作業状況一覧を取得し、バインドプロパティへ設定
    this.genericMasterService.getWorkStatuses().subscribe((data) => {
      if (this.searchConditions.allWorkStatuses.length === 0) {
        this.searchConditions.allWorkStatuses = [...data];
        this.searchConditions.selectedWorkStatuses = [...data];
        this.searchConditionsSubject.next(this.searchConditions);
      }
    });
    //部署一覧を取得し、バインドプロパティへ設定
    this.genericMasterService.getDepartments().subscribe((data) => {
      if (this.searchConditions.allDepartments.length === 0) {
        this.searchConditions.allDepartments = data;
        this.searchConditions.selectedDepartments = [...data].filter((data) => {
          return data.Code === sessionStorage.getItem('department');
        });
        this.searchConditionsSubject.next(this.searchConditions);
      }
    });
    //担当者一覧を取得し、バインドプロパティへ設定
    this.userService.getUsersByFactoryAndDept().subscribe((data) => {
      if (this.searchConditions.allUsers.length === 0) {
        this.searchConditions.allUsers = [...data];
        this.searchConditionsSubject.next(this.searchConditions);
      }
    });
    //場所一覧を取得し、バインドプロパティへ設定
    this.locationService.getLocation().subscribe((data) => {
      if (this.searchConditions.allLocations.length === 0) {
        this.searchConditions.allLocations = [...data];
        this.searchConditionsSubject.next(this.searchConditions);
      }
    });
    //設備一覧を取得し、バインドプロパティへ設定
    this.facilityService.getFacility().subscribe((data) => {
      if (this.searchConditions.allFacilities.length === 0) {
        this.searchConditions.allFacilities= [...data];
        this.searchConditionsSubject.next(this.searchConditions);
      }
    });
  }

  //検索条件の変更通知
  public onNotifySearchConditionsChanged(after: SearchConditions) {
    console.log('onNotifySearchConditionsChanged!\n');
    this.searchConditionsSubject.next(after);
  }
}
