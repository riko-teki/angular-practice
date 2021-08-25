import { TestBed } from '@angular/core/testing';

import { RegistResultService } from './regist-result.service';

describe('RegistResultService', () => {
  let service: RegistResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
