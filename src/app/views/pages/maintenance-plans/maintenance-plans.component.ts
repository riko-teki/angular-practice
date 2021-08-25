import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchConditions } from 'src/app/classes/searchconditions';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { GenericMasterService } from 'src/app/services/generic-master.service';
import { MaintenancePlanService } from 'src/app/services/maintenance-plan.service';
import { SearchConditionsService } from 'src/app/services/search-conditions.service';
/**
 * メンテナンス計画一覧画面
 *
 * @export
 * @class maintenancePlansComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-maintenance-plans',
  templateUrl: './maintenance-plans.component.html',
  styleUrls: ['./maintenance-plans.component.scss']
})

export class MaintenancePlansComponent implements OnInit, OnDestroy {

  /**
   * 検索条件データの変更を購読するオブジェクト
   *
   * @type {Subscription}
   * @memberof maintenancePlansComponent
   */
  searchConditionsSubscription!: Subscription;

  /**
   * メンテナンス計画データ
   *
   * @type {IMaintenancePlanResult[]}
   * @memberof maintenancePlansComponent
   */
  maintenances: IMaintenancePlanResult[] = [];

  /**
   * メンテナンス計画を検索条件によってフィルターしたデータ
   *
   * @type {IMaintenancePlanResult[]}
   * @memberof maintenancePlansComponent
   */
  filteredMaintenances: IMaintenancePlanResult[] = [];

  /**
   * 検索条件データ
   *
   * @type {SearchConditions}
   * @memberof maintenancePlansComponent
   */
  searchConditions!: SearchConditions;

  /**
   * Creates an instance of maintenancePlansComponent.
   * @param {GenericMasterService} genericMasterService
   * @param {MaintenancePlanService} maintenancePlanService
   * @param {SearchConditionsService} searchConditionsService
   * @memberof maintenancePlansComponent
   */
  constructor(private genericMasterService: GenericMasterService,
    private maintenancePlanService: MaintenancePlanService,
    private searchConditionsService: SearchConditionsService) { }

  /**
   *コンポーネント初期化時のライフサイクルメソッド
   *
   * @memberof maintenancePlansComponent
   */
  ngOnInit(): void {
    //メンテナンス計画データを取得
    this.maintenancePlanService.getMaintenancePlansResults().subscribe(data => {
      this.maintenances = data;
      this.filterMaintenances();
    })

    // //汎用マスタデータを工場ごとに全て取得
    // this.genericMasterService.getGenericMasterByFactory().subscribe(data => {
    //   this.genericMasterService.onNotifyGenericMasterChanged(data);
    // })

    //検索条件変更の購読
    this.searchConditionsSubscription = this.searchConditionsService.searchConditionsSubject.subscribe(
      data => this.searchConditions = data
    )
  }

  /**
   *コンポーネント破棄時のライフサイクルメソッド
   *
   * @memberof maintenancePlansComponent
   */
  ngOnDestroy(): void {
    //購読の破棄を忘れるな
    this.searchConditionsSubscription.unsubscribe();
  }

  /**
   * メンテナンス計画データを検索条件に基づきフィルタリングする
   * 自分が担当 → 日付 → 作業状況 → 部署 → 優先度 → 場所
   * @memberof maintenancePlansComponent
   *
   */
  filterMaintenances() {
    //検索条件変更の通知
    this.searchConditionsService.onNotifySearchConditionsChanged(this.searchConditions);

    this.filteredMaintenances = this.maintenances
      .filter(maintenance => {
        //自分が担当のみ表示がONで且つサインインユーザーIDとメンテナンス計画の担当者IDが一致したもののみ
        //OFFだったら全部返す
        return this.searchConditions.isChargePerson ? maintenance.UserID === sessionStorage.getItem('userID') : true;
      })
      .filter(maintenance => {
        //メンテナンス計画の日付が検索条件の日付範囲に入ってるもののみ
        return new Date(maintenance.Date) >= this.searchConditions.selectedDateRange.From &&
          new Date(maintenance.Date) <= this.searchConditions.selectedDateRange.To
      })
      .filter(maintenance => {
        //メンテナンス計画の作業状況が検索条件の作業状況配列に入ってるもののみ
        return this.searchConditions.selectedWorkStatuses.length === 0 ?
          true :
          this.searchConditions.selectedWorkStatuses.some(d => {
            return d.Code === maintenance.WorkStatus || (d.CodeName === '未着手' && maintenance.WorkStatus === '');
          })
      })
      .filter(maintenance => {
        //メンテナンス計画の部署が検索条件の部署配列に入ってるもののみ
        return this.searchConditions.selectedDepartments.length === 0 ?
          true :
          this.searchConditions.selectedDepartments.some(d => {
            return d.Code === maintenance.DepartmentCode;
          })
      })
      .filter(maintenance => {
        //メンテナンス計画の優先度が検索条件の優先度配列に入ってるもののみ
        return this.searchConditions.selectedLocations.length === 0 ?
          true :
          this.searchConditions.selectedLocations.some(d => {
            return d.LocationCode === maintenance.LocationCode;
          })
      })
  }
}
