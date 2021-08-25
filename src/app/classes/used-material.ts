export class UsedMaterial {
	readonly Factory: string = ''
	readonly PlanGroupID: string = ''
	readonly PlanID: string = ''
	MaterialCode: string = ''
	MaterialName: string = ''
	LotNo: string = ''
	UsedQTY: number = 0
	RecentlyStockQTYChangeDate: Date = new Date()
	readonly UpdateDisplay: string = ''
	readonly String1: string = ''
	readonly String2: string = ''
	readonly String3: string = ''
	readonly String4: string = ''
	readonly String5: string = ''
	readonly Numeric1: number = 0
	readonly Numeric2: number = 0
	readonly Numeric3: number = 0
	readonly Numeric4: number = 0
	readonly Numeric5: number = 0
	InsertUserID: string = ''
	readonly InsertDate:string = ''
	readonly UpdateUserID: string = ''
	UpdateDate: string = ''
	readonly UpdateCounter: number = 0

	constructor(factory: string = '', planGroupID: string = '', planID: string = ''){
		this.Factory = factory;
		this.PlanGroupID = planGroupID;
		this.PlanID = planID
	}
  }
  