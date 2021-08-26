import { TestBed } from '@angular/core/testing';

import { MaintenancePlanResultService } from './maintenance-plan-result.service';

describe('MaintenancePlanResultService', () => {
  let service: MaintenancePlanResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenancePlanResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
