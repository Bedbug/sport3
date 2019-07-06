import { TestBed } from '@angular/core/testing';

import { ErrorDisplayService } from './error-display.service';

describe('ErrorDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorDisplayService = TestBed.get(ErrorDisplayService);
    expect(service).toBeTruthy();
  });
});
