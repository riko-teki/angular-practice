import { Component, OnInit } from '@angular/core';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { MaintenancePlanResultService } from 'src/app/services/maintenance-plan-result.service';

@Component({
  selector: 'app-maintenance-plans',
  templateUrl: './maintenance-plans.component.html',
  styleUrls: ['./maintenance-plans.component.scss'],
})
export class MaintenancePlansComponent implements OnInit {
  /**
   * メンテナンス計画データ
   *
   * @type {IMaintenancePlanResult[]}
   * @memberof maintenancePlansComponent
   */
  maintenances: IMaintenancePlanResult[] = [];

  /**
   * Creates an instance of MaintenancePlansComponent.
   * @param {MaintenancePlanResultService} maintenancePlanResultService
   * @memberof MaintenancePlansComponent
   */
  constructor(
    private maintenancePlanResultService: MaintenancePlanResultService
  ) {}

  /**
   *コンポーネント初期化時のライフサイクルメソッド
   *
   * @memberof maintenancePlansComponent
   */
  ngOnInit(): void {
    //メンテナンス計画データを取得
    this.maintenancePlanResultService
      .getMaintenancePlanResult()
      .subscribe((data) => {
        this.maintenances = data;
      });
  }
}
