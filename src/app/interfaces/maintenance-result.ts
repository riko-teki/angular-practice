export interface IMaintenanceResult {
	readonly Factory: string,
        readonly PlanGroupID: string,
        readonly PlanID: string
	WorkStatus: string
	WorkResultOverview: string
	WorkTime: number
	CompleteFlag: string
	InspectionDatetime: Date
	InspectionResultCategory: string
	InspectionResultOKNG: string
	InspectionResultNum: number
	Comment: string
	UpdateDisplay: string
	readonly String1: string
	readonly String2: string
	readonly String3: string
	readonly String4: string
	readonly String5: string
	readonly Numeric1: number
	readonly Numeric2: number
	readonly Numeric3: number
	readonly Numeric4: number
	readonly Numeric5: number
	InsertUserID: string
	InsertDate: string
	UpdateUserID: string
	UpdateDate: string
	UpdateCounter: number
}