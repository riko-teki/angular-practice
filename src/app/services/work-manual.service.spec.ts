import { TestBed } from '@angular/core/testing';

import { WorkManualService } from './work-manual.service';

describe('WorkManualService', () => {
  let service: WorkManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
