import { TestBed } from '@angular/core/testing';

import { GenericMasterService } from './generic-master.service';

describe('GenericMasterService', () => {
  let service: GenericMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
