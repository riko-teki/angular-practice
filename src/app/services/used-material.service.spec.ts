import { TestBed } from '@angular/core/testing';

import { UsedMaterialService } from './used-material.service';

describe('UsedMaterialService', () => {
  let service: UsedMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsedMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
