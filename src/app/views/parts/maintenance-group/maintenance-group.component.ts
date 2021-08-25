import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-maintenance-group',
  templateUrl: './maintenance-group.component.html',
  styleUrls: ['./maintenance-group.component.scss']
})
export class MaintenanceGroupComponent implements OnInit {

  @Input() title: string = '';
  @Input() maintenanceGroup: IMaintenancePlanResult[] = [];
  @Output() onClickBulkPlanStop: EventEmitter<IMaintenancePlanResult[]> = new EventEmitter<IMaintenancePlanResult[]>();
  @Output() onClickBulkComplete: EventEmitter<IMaintenancePlanResult[]> = new EventEmitter<IMaintenancePlanResult[]>();

  
  public get isManager() : boolean {
    return this.authService.isManager
  }

  public get isDone() :boolean{
    return !this.maintenanceGroup.some(m => m.WorkStatus === '0001')
  }
  

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {}

  navigateDetail() {
    this.router.navigate(
      [`${this.maintenanceGroup[0].Date}/${this.maintenanceGroup[0].FacilityCode}`],
      { relativeTo: this.activatedRoute });
  }

  navigateRegistResult() {
    this.router.navigate(
      [`${this.maintenanceGroup[0].Date}/${this.maintenanceGroup[0].FacilityCode}/group-regist-result`],
      { relativeTo: this.activatedRoute });
  }

  navigateRegistResultSummary() {
    this.router.navigate(
      [`${this.maintenanceGroup[0].Date}/${this.maintenanceGroup[0].FacilityCode}/regist-result-summary`],
      { relativeTo: this.activatedRoute });
  }



  bulkPlanStop(){
    this.onClickBulkPlanStop.emit(this.maintenanceGroup)
  }

  bulkComplete(){
    this.onClickBulkComplete.emit(this.maintenanceGroup)
  }

}
