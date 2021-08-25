import { IMaintenanceResult } from "./maintenance-result";
import { IUsedMaterial } from "./used-material";

export interface IResultMaterialSummary {
	Results: IMaintenanceResult[]
	Materials: IUsedMaterial[]
	PreviousMaterials: IUsedMaterial[]
}
