import { TestBed } from '@angular/core/testing';

import { CardToastService } from './card-toast.service';

describe('CardToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardToastService = TestBed.get(CardToastService);
    expect(service).toBeTruthy();
  });
});
