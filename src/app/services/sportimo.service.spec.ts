import { TestBed } from '@angular/core/testing';

import { SportimoService } from './sportimo.service';

describe('SportimoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SportimoService = TestBed.get(SportimoService);
    expect(service).toBeTruthy();
  });
});
