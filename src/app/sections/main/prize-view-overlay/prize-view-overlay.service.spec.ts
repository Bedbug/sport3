import { TestBed } from '@angular/core/testing';

import { PrizeViewOverlayService } from './prize-view-overlay.service';

describe('PrizeViewOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrizeViewOverlayService = TestBed.get(PrizeViewOverlayService);
    expect(service).toBeTruthy();
  });
});
