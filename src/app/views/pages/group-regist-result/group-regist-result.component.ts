import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { GenericMasterService } from 'src/app/services/generic-master.service';
import { MaintenancePlanService } from 'src/app/services/maintenance-plan.service';

@Component({
  selector: 'app-group-regist-result',
  templateUrl: './group-regist-result.component.html',
  styleUrls: ['./group-regist-result.component.scss']
})
export class GroupRegistResultComponent implements OnInit {

  maintenances!: IMaintenancePlanResult[]

  constructor(private activatedRoute: ActivatedRoute,
    private maintenancePlanService: MaintenancePlanService,
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
    });
  }

  onUpdate(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      const date = param.get('date')
      const facilityCode = param.get('facilitycode')
      console.log(date,facilityCode)
      if (date && facilityCode) {
        this.maintenancePlanService.getMaintenancePlansResults(date, facilityCode).subscribe(
          data => this.maintenances = data
        )
      }
    })
  }
}
