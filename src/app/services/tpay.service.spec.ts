import { TestBed } from '@angular/core/testing';

import { TpayService } from './tpay.service';

describe('TpayService', () => {
  let service: TpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
