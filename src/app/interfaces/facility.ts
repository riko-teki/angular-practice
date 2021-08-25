export interface IFacility {
	Factory: string,            //工場
	FacilityCode: string,       //設備コード
	FacilityName: string,       //設備名
	InspectionOrder: string,    //点検順序
	ChildFacilityCount: number, //子設備数
	UnitCode:string,            //単位コード
	MakerName:string,           //メーカー名
	ModelName:string,           //機種名
	ModelCode: string,          //型式
	ReferenceNumber:string,     //整理番号
	SerialNumaber:string,       //製造番号
	ProductionDate:Date,        //製造日
	FacilityCategory:string,    //設備カテゴリー
	LocationCode:string,        //場所コード
	ManagementUserID:string,    //管理担当者ID
	DepartmentCode:string,      //部署コード
	PurchaseDate:Date,          //購入日
	OperationStartDate: Date,   //稼働開始日
	PurchaseCost: Date,         //購入費用
	Remarks: Date,              //備考
}