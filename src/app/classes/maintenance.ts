
export class Maintenance {

    constructor(
        readonly Factory: string = '',
        readonly PlanGroupID: string = '',
        readonly PlanID: string = '',
        readonly Title: string = '',
        readonly Date: Date,
        readonly PeriodStartDate: Date,
        readonly PeriodEndDate: Date,
        readonly InspectionFrequency: string= '',
        readonly Frequency: number= 0,
        readonly MondayFlag: string= '',
        readonly TuesdayFlag: string= '',
        readonly WednesdayFlag: string= '',
        readonly ThursdayFlag: string= '',
        readonly FrydayFlag: string= '',
        readonly SaturdayFlag: string= '',
        readonly SundayFlag: string= '',
        readonly Date1: Date,
        readonly Date2: Date,
        readonly Date3: Date,
        readonly Date4: Date,
        readonly Date5: Date,
        readonly ConservationCateGory: string= '',
        readonly LocationCode: string= '',
        readonly LocationName: string= '',
        readonly FacilityCode: string= '',
        readonly FacilityName: string= '',
        readonly UserID: string= '',
        readonly UserName: string= '',
        readonly DepartmentCode: string= '',
        readonly DepartmentName: string= '',
        readonly Priority: string= '',
        readonly PriorityName: string= '',
        readonly ScheduledWorkTime: number= 0,
        readonly InspectionMethod: string= '',
        readonly InspectionResultCategory: string= '',
        readonly DecisionCondision: string= '',
        readonly DecisionCondisionMIN: number = 0,
        readonly DecisionCondisionMAX: number = 0,
        readonly Remarks: string= '',
    ) {}

    
    public get maintenanceID() : string {
        return `${this.Factory}/${this.PlanGroupID}/${this.PlanID}`
    }
       
}