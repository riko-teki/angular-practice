import { IDepartment } from '../interfaces/department';
import { IFacility } from '../interfaces/facility';
import { ILocation } from '../interfaces/location';
import { IPriority } from '../interfaces/priority';
import { IUser } from '../interfaces/user';
import { IWorkstatus } from '../interfaces/workstatus';

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
    
    public allWorkStatuses: IWorkstatus[] = [],
    public selectedWorkStatuses: IWorkstatus[] = [],

    public allPriorities: IPriority[] = [],
    public selectedPriorities: IPriority[] = [],

    public allDepartments: IDepartment[] = [],
    public selectedDepartments: IDepartment[] = [],

    public allUsers: IUser[] = [],
    public selectedUsers: IUser[] = [],

    public allLocations: ILocation[] = [],
    public selectedLocations: ILocation[] = [],

    public allFacilities: IFacility[] = [],
    public selectedFacilities: IFacility[] = []
  ) {}
}
