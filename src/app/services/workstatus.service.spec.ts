import { TestBed } from '@angular/core/testing';

import { WorkstatusService } from './workstatus.service';

describe('WorkstatusService', () => {
  let service: WorkstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
