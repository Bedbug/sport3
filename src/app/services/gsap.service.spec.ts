import { TestBed } from '@angular/core/testing';

import { GsapService } from './gsap.service';

describe('GsapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GsapService = TestBed.get(GsapService);
    expect(service).toBeTruthy();
  });
});
