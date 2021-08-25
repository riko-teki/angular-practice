import { TestBed } from '@angular/core/testing';

import { MaintenancePlanService } from './maintenance-plan.service';

describe('MaintenancePlanService', () => {
  let service: MaintenancePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenancePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
