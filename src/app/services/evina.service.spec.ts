import { TestBed } from '@angular/core/testing';

import { EvinaService } from './evina.service';

describe('EvinaService', () => {
  let service: EvinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
