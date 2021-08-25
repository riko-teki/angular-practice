import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchConditions } from '../classes/searchconditions';
import { IMaintenancePlanResult } from '../interfaces/maintenance-plan-result';
import { IMaintenanceResult } from '../interfaces/maintenance-result';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenancePlanService {
  constructor(
    private httpClientService: HttpClientService,
    private authService: AuthService
  ) {}

  /**
   * メンテナンス計画をAPIから取得
   *
   * @param {string} [date='']
   * @param {string} [facilityCode='']
   * @return {*}  {Observable<IMaintenancePlanResult[]>}
   * @memberof MaintenancePlanService
   */
  getMaintenancePlansResults(
    date: string = '',
    facilityCode: string = ''
  ): Observable<IMaintenancePlanResult[]> {
    return this.httpClientService.getMaintenancePlansResults(
      this.authService.signInFactory,
      date,
      facilityCode
    );
  }

  bulkPlanStop(maintenances: IMaintenanceResult[]): Observable<any> {
    //差戻は除く
    maintenances
      .filter((maintenance) => {
        maintenance.WorkStatus != '0004';
      })
      .forEach((maintenance) => {
        //全ての実績の作業状況を計画停止へ変更
        maintenance.WorkStatus = '0002';
        //点検日時を現在に設定
        maintenance.InspectionDatetime = new Date();
        if (maintenance.InsertUserID) {
          maintenance.UpdateUserID = this.authService.userID;
        } else {
          maintenance.InsertUserID = this.authService.userID;
        }
      });
    return this.httpClientService.postMaintenancePlansResults(maintenances);
  }

  bulkComplete(maintenances: IMaintenanceResult[]): Observable<any> {
    //差戻は除く
    maintenances
      .filter((maintenance) => {
        maintenance.WorkStatus != '0004';
      })
      .forEach((maintenance) => {
        //全ての実績を完了へ変更
        maintenance.CompleteFlag = '1';
        //点検日時を現在に設定
        maintenance.InspectionDatetime = new Date();
        if (maintenance.InsertUserID) {
          maintenance.UpdateUserID = this.authService.userID;
        } else {
          maintenance.InsertUserID = this.authService.userID;
        }
      });
    return this.httpClientService.postMaintenancePlansResults(maintenances);
  }

  /**
   * メンテナンス計画配列を二つのキーでグループ化する
   *
   * @param {any[]} objectArray
   * @param {string} property1
   * @param {string} property2
   * @return {*}
   * @memberof MaintenancePlanService
   */
  groupBy(objectArray: any[], property1: string, property2: string) {
    return objectArray.reduce(function (acc, obj) {
      let key = `${obj[property1]}:${obj[property2]}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  /**
   * メンテナンス計画を検索条件によってフィルターして
   * グループ化したオブジェクトを返却する
   *
   * @param {IMaintenancePlanResult[]} maintenances
   * @param {SearchConditions} searchConditions
   * @memberof MaintenancePlanService
   */
  filterMaintenances(
    maintenances: IMaintenancePlanResult[],
    searchConditions: SearchConditions
  ): any {
    return this.groupBy(
      maintenances
        .filter((maintenance) => {
          //自分が担当のみ表示がONで且つサインインユーザーIDとメンテナンス計画の担当者IDが一致したもののみ
          //OFFだったら全部返す
          return searchConditions.isChargePerson
            ? maintenance.UserID === sessionStorage.getItem('userID')
            : true;
        })
        .filter((maintenance) => {
          //メンテナンス計画の日付が検索条件の日付範囲に入ってるもののみ
          let maintenanceDate = new Date(maintenance.Date);
          maintenanceDate.setHours(0);
          return (
            maintenanceDate >= searchConditions.selectedDateRange.From &&
            maintenanceDate <= searchConditions.selectedDateRange.To
          );
        })
        .filter((maintenance) => {
          //メンテナンス計画の優先順位が検索条件の優先順位の範囲に入ってるもののみ
          const priority = Number(maintenance.Priority);
          return (
            priority >= searchConditions.selectedPriorityRange.From &&
            priority <= searchConditions.selectedPriorityRange.To
          );
        })
        .filter((maintenance) => {
          //メンテナンス計画の作業状況が検索条件の作業状況配列に入ってるもののみ
          return searchConditions.selectedWorkStatuses.length === 0
            ? true
            : searchConditions.selectedWorkStatuses.some((d) => {
                return (
                  d.Code === maintenance.WorkStatus ||
                  (d.CodeName === '未着手' && maintenance.WorkStatus === '')
                );
              });
        })
        .filter((maintenance) => {
          //メンテナンス計画の部署が検索条件の部署配列に入ってるもののみ
          return searchConditions.selectedDepartments.length === 0
            ? true
            : searchConditions.selectedDepartments.some((d) => {
                return d.Code === maintenance.DepartmentCode;
              });
        })
        .filter((maintenance) => {
          //メンテナンス計画の担当者が検索条件の担当者配列に入ってるもののみ
          return searchConditions.selectedUsers.length === 0
            ? true
            : searchConditions.selectedUsers.some((d) => {
                return d.ID === maintenance.UserID;
              });
        })
        .filter((maintenance) => {
          //メンテナンス計画の優先度が検索条件の優先度配列に入ってるもののみ
          return searchConditions.selectedLocations.length === 0
            ? true
            : searchConditions.selectedLocations.some((d) => {
                return d.LocationCode === maintenance.LocationCode;
              });
        })
        .filter((maintenance) => {
          //メンテナンス計画の設備が検索条件の設備配列に入ってるもののみ
          return searchConditions.selectedFacilities.length === 0
            ? true
            : searchConditions.selectedFacilities.some((d) => {
                return d.FacilityCode === maintenance.FacilityCode;
              });
        }),
      'Date',
      'FacilityName'
    );
  }
}
