import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { GenericMasterService } from 'src/app/services/generic-master.service';
import { MaintenancePlanService } from 'src/app/services/maintenance-plan.service';

@Component({
  selector: 'app-maintenance-group-detail',
  templateUrl: './maintenance-group-detail.component.html',
  styleUrls: ['./maintenance-group-detail.component.scss']
})
export class MaintenanceGroupDetailComponent implements OnInit {

  maintenances!: IMaintenancePlanResult[];


  constructor(private maintenancePlanService: MaintenancePlanService,
    private activatedRoute: ActivatedRoute,
    private genericMasterService: GenericMasterService) { }

  ngOnInit(): void {
    this.genericMasterService.genericMasterSubject.subscribe(() => {
      this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
        const date = param.get('date')
        const facilityCode = param.get('facilitycode')
        if (date && facilityCode) {
          this.maintenancePlanService.getMaintenancePlansResults(date, facilityCode).subscribe(
            data => this.maintenances = data
          )
        }
      })
    })
  }

}
