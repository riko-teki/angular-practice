import { TestBed } from '@angular/core/testing';

import { SearchConditionsService } from './search-conditions.service';

describe('SearchConditionsService', () => {
  let service: SearchConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
