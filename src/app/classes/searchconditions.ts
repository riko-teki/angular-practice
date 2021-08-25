import { IFacility } from '../interfaces/facility';
import { IGenericMaster } from '../interfaces/generic-master';
import { ILocation } from '../interfaces/location';
import { IUser } from '../interfaces/user';

export class SearchConditions {
  constructor(
    public isChargePerson: boolean = true,
    public selectedDateRange: {
      From: Date;
      To: Date;
    } = {
      //現在日付から一週間前の0時
      From: new Date(
        new Date(new Date()).setHours(
          0,
          0,
          0,
          0
        )
      ),
      //現在日付から一週間後の0時
      To: new Date(
        new Date(new Date()).setHours(
          23,
          59,
          59
        )
      ),
    },
    public selectedPriorityRange: {
      From: number;
      To: number;
    } = { From: 0, To: 100 },
    public allWorkStatuses: IGenericMaster[] = [],
    public selectedWorkStatuses: IGenericMaster[] = [],
    public allPriorities: IGenericMaster[] = [],
    public allDepartments: IGenericMaster[] = [],
    public selectedDepartments: IGenericMaster[] = [],
    public allUsers: IUser[] = [],
    public selectedUsers: IUser[] = [],
    public allLocations: ILocation[] = [],
    public selectedLocations: ILocation[] = [],
    public allFacilities: IFacility[] = [],
    public selectedFacilities: IFacility[] = []
  ) {}
}
