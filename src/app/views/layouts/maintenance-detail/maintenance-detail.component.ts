import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { MaintenancePlanResultService } from 'src/app/services/maintenance-plan-result.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.scss'],
})
export class MaintenanceDetailComponent implements OnInit {
  //メンテナンス計画データ
  maintenance!: IMaintenancePlanResult;

  constructor(
    private activatedRoute: ActivatedRoute,
    private maintenancePlanResultService: MaintenancePlanResultService
  ) {}

  ngOnInit(): void {
    //URLパスパラメータからIDを取得
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('maintenanceID');
      if (id) {
        //取得したIDでメンテナンス予実データを取得
        this.maintenancePlanResultService
          .getMaintenancePlanResultByID(id)
          .subscribe((data) => (this.maintenance = data));
      }
    });
  }
}
