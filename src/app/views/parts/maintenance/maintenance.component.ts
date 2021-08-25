import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  @Input() maintenance!: IMaintenancePlanResult;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  NavigateDetail(): void {
    this.router.navigate(
      [`${this.maintenance.PlanGroupID}/${this.maintenance.PlanID}`],
      { relativeTo: this.activatedRoute });
  }
  NavigateRegistresult(): void {
    this.router.navigate(
      [`${this.maintenance.PlanGroupID}/${this.maintenance.PlanID}/regist-result`],
      { relativeTo: this.activatedRoute });
  }
}
