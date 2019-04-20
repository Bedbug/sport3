import { TestBed } from '@angular/core/testing';

import { ShiftBeltService } from './shiftbelt.service';

describe('APIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftBeltService = TestBed.get(ShiftBeltService);
    expect(service).toBeTruthy();
  });
});
