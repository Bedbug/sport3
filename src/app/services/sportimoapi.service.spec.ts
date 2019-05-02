import { TestBed } from '@angular/core/testing';

import { SportimoApiService } from './sportimoapi.service';

describe('SportimoapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SportimoApiService = TestBed.get(SportimoApiService);
    expect(service).toBeTruthy();
  });
});
