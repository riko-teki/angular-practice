import { TestBed } from '@angular/core/testing';

import { UnauthenticateGuard } from './unauthenticate.guard';

describe('UnauthenticateGuard', () => {
  let guard: UnauthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
