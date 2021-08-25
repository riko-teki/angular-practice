export interface IMaterialStock {
	readonly Factory: string
	readonly MaterialCode: string
	readonly MaterialName: string
	readonly LotNo: string
	readonly LocationCode: string
	readonly FacilityCode: string
	StockQTY: number
	readonly PreviousQTY: number
	readonly RecentlyStockQTYChangeDate: number
	readonly UpdateReasonCategory: string
	readonly UpdateReasonDetail: string
	readonly UpdateDisplay: string
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
	readonly InsertUserID: string
	readonly InsertDate: string
	readonly UpdateUserID: string
	readonly UpdateDate: string
	readonly UpdateCounter: number
}
