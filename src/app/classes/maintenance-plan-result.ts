import { IMaintenancePlanResult } from "../interfaces/maintenance-plan-result"

export class MaintenancePlanResult implements IMaintenancePlanResult {
		id: string = ''	
		Factory: string=''
		Title: string=''
		Date: Date = new Date()
		LocationCode: string=''
		LocationName: string=''
		FacilityCode: string=''
		FacilityName: string=''
		UserID: string=''
		UserName: string=''
		DepartmentCode: string=''
		DepartmentName: string=''
		Priority: string=''
		PriorityName: string=''
		ScheduledWorkTime: number=0
		InspectionUserID :string = ''
		InspectionUserName :string = ''
		InspectionMethod: string=''
		InspectionResultCategory: string = ''
		DecisionCondition: string=''
		DecisionConditionMIN: number = 0
		DecisionConditionMAX: number = 0
		UnitCode: string = ''
		UnitName: string = ''
		DecisionConditionMinDecimalLength: number = 0
		DecisionConditionMaxDecimalLength: number = 0
		Remarks: string=''
		WorkStatus: string=''
		WorkStatusName: string =''
		WorkResultOverview: string=''
		WorkTime: number=0
		CompleteFlag: boolean = false;
		InspectionDatetime: Date = new Date()
		InspectionResultOKNG: string=''
		InspectionResultNum: number=0
		Comment: string=''
}