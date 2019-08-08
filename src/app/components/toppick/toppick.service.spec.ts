import { TestBed } from '@angular/core/testing';

import { ToppickService } from './toppick.service';

describe('ToppickService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToppickService = TestBed.get(ToppickService);
    expect(service).toBeTruthy();
  });
});
