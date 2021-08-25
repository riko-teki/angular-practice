import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGenericMaster } from 'src/app/interfaces/generic-master';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { GenericMasterService } from 'src/app/services/generic-master.service';

@Component({
  selector: 'app-confirm-item',
  templateUrl: './confirm-item.component.html',
  styleUrls: ['./confirm-item.component.scss'],
})
export class ConfirmItemComponent implements OnInit {
  @Input() maintenancePlanResult!: IMaintenancePlanResult;
  @Input() resultOKNGConditions!: IGenericMaster[];
  @Output() maintenancePlanResultChange: EventEmitter<IMaintenancePlanResult> =
    new EventEmitter<IMaintenancePlanResult>();
  

  constructor() {}

  ngOnInit(): void {

  }

  onChange() {
    this.maintenancePlanResultChange.emit(this.maintenancePlanResult);
  }
}
