import { IMaintenanceResult } from "./maintenance-result";
import { IUsedMaterial } from "./used-material";

export interface IResultMaterial {
	Result: IMaintenanceResult
	Materials: IUsedMaterial[]
	PreviousMaterials: IUsedMaterial[]
}
