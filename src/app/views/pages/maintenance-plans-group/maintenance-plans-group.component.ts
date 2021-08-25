import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaintenanceResult } from 'src/app/classes/maintenance-result';
import { SearchConditions } from 'src/app/classes/searchconditions';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { IMaintenanceResult } from 'src/app/interfaces/maintenance-result';
import { MaintenancePlanService } from 'src/app/services/maintenance-plan.service';
import { SearchConditionsService } from 'src/app/services/search-conditions.service';

@Component({
  selector: 'app-maintenance-plans-group',
  templateUrl: './maintenance-plans-group.component.html',
  styleUrls: ['./maintenance-plans-group.component.scss'],
})
export class MaintenancePlansGroupComponent implements OnInit, OnDestroy {
  //メンテナンス計画データ配列
  maintenancePlansResults: IMaintenancePlanResult[] = [];
  //メンテナンス計画をフィルターしたグループ
  filteredMaintenanceGroup: { [key: string]: IMaintenancePlanResult[] } = {};

  //検索条件
  searchConditions!: SearchConditions;
  //検索条件の購読オブジェクト
  searchConditionsSubscription!: Subscription;

  //プログレスバーの状態、動いてるか止まってるか
  progressBarMode: ProgressBarMode = 'determinate';

  constructor(
    private maintenancePlanService: MaintenancePlanService,
    private searchConditionsService: SearchConditionsService
  ) {}

  ngOnInit(): void {
    //プログレスバー動作開始
    this.progressBarMode = 'indeterminate';
    //メンテナンス計画データを取り出し、グループにまとめる
    this.maintenancePlanService.getMaintenancePlansResults().subscribe(
      (data) => {
        this.maintenancePlansResults = data;
        this.filteredMaintenanceGroup =
          this.maintenancePlanService.filterMaintenances(
            this.maintenancePlansResults,
            this.searchConditions
          );
        //プログレスバー停止
        this.progressBarMode = 'determinate';
      },
      () => {
        this.progressBarMode = 'determinate';
      }
    );
    //検索条件変更の購読
    this.searchConditionsSubscription =
      this.searchConditionsService.searchConditionsSubject.subscribe(
        (data) => (this.searchConditions = data)
      );
  }

  ngOnDestroy(): void {
    this.searchConditionsSubscription.unsubscribe();
  }

  filter(): void {
    this.filteredMaintenanceGroup =
      this.maintenancePlanService.filterMaintenances(
        this.maintenancePlansResults,
        this.searchConditions
      );
  }

  bulkPlanStop(maintenances: IMaintenancePlanResult[]) {
    //メンテナンス計画と実績からメンテナンス実績のみを取り出し
    let results: IMaintenanceResult[] = [];
    maintenances.forEach((maintenance) =>
      results.push(new MaintenanceResult(maintenance))
    );

    //APIにPOST
    this.maintenancePlanService.bulkPlanStop(results).subscribe((data) => {
      console.log(data);
      //メンテナンス計画データを取り出し、グループにまとめる
      this.maintenancePlanService
        .getMaintenancePlansResults()
        .subscribe((data) => {
          this.maintenancePlansResults = data;
          this.filteredMaintenanceGroup =
            this.maintenancePlanService.filterMaintenances(
              this.maintenancePlansResults,
              this.searchConditions
            );
        });
    });
  }

  bulkComplete(maintenances: IMaintenancePlanResult[]) {
    //メンテナンス計画と実績からメンテナンス実績のみを取り出し
    let results: IMaintenanceResult[] = [];
    maintenances.forEach((maintenance) =>
      results.push(new MaintenanceResult(maintenance))
    );

    this.maintenancePlanService.bulkComplete(results).subscribe((data) => {
      console.log(data);
    });
    console.log(maintenances);
  }
}
