import { IMaintenancePlanResult } from '../interfaces/maintenance-plan-result';

export class MaintenanceResult {
  readonly Factory: string = '';
  readonly PlanGroupID: string = '';
  readonly PlanID: string = '';
  WorkStatus: string = '';
  WorkResultOverview: string = '';
  WorkTime: number = 0;
  CompleteFlag: string = '0';
  InspectionDatetime: Date = new Date();
  InspectionResultCategory: string = '';
  InspectionResultOKNG: string = '';
  InspectionResultNum: number = 0;
  Comment: string = '';
  UpdateDisplay: string = '';
  readonly String1: string = '';
  readonly String2: string = '';
  readonly String3: string = '';
  readonly String4: string = '';
  readonly String5: string = '';
  readonly Numeric1: number = 0;
  readonly Numeric2: number = 0;
  readonly Numeric3: number = 0;
  readonly Numeric4: number = 0;
  readonly Numeric5: number = 0;
  InsertUserID: string = '';
  InsertDate: string = '';
  UpdateUserID: string = '';
  UpdateDate: string = '';
  UpdateCounter: number = 0;

  constructor(maintenancePlanResult: IMaintenancePlanResult) {
    this.Factory = maintenancePlanResult.Factory;
    this.PlanGroupID = maintenancePlanResult.PlanGroupID;
    this.PlanID = maintenancePlanResult.PlanID;
    this.WorkStatus = maintenancePlanResult.WorkStatus;
    this.WorkResultOverview = maintenancePlanResult.WorkResultOverview;
    this.WorkTime = maintenancePlanResult.WorkTime;
    this.CompleteFlag =
      maintenancePlanResult.CompleteFlag === ''
        ? '0'
        : maintenancePlanResult.CompleteFlag === '0'
        ? '0'
        : '1';
    this.InspectionDatetime = maintenancePlanResult.InspectionDatetime;
    this.InspectionResultCategory =
      maintenancePlanResult.PlanInspectionResultCategory;
    this.InspectionResultOKNG = maintenancePlanResult.InspectionResultOKNG;
    this.InspectionResultNum = maintenancePlanResult.InspectionResultNum;
    this.Comment = maintenancePlanResult.Comment;
    this.UpdateDisplay = maintenancePlanResult.ResultUpdateDisplay;
    this.String1 = maintenancePlanResult.ResultString1;
    this.String2 = maintenancePlanResult.ResultString2;
    this.String3 = maintenancePlanResult.ResultString3;
    this.String4 = maintenancePlanResult.ResultString4;
    this.String5 = maintenancePlanResult.ResultString5;
    this.Numeric1 = maintenancePlanResult.ResultNumeric1;
    this.Numeric2 = maintenancePlanResult.ResultNumeric2;
    this.Numeric3 = maintenancePlanResult.ResultNumeric3;
    this.Numeric4 = maintenancePlanResult.ResultNumeric4;
    this.Numeric5 = maintenancePlanResult.ResultNumeric5;
    this.InsertUserID = maintenancePlanResult.ResultInsertUserID;
    this.InsertDate = maintenancePlanResult.ResultInsertDate;
    this.UpdateUserID = maintenancePlanResult.ResultUpdateUserID;
    this.UpdateDate = maintenancePlanResult.ResultUpdateDate;
    this.UpdateCounter = maintenancePlanResult.ResultUpdateCounter;
  }
}
