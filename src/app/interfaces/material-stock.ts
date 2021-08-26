export interface IMaterialStock {
	readonly Factory: string
	readonly MaterialCode: string
	readonly MaterialName: string
	readonly LotNo: string
	readonly LocationCode: string
	readonly FacilityCode: string
	StockQTY: number
}
