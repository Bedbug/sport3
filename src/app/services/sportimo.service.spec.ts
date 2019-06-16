import { TestBed } from '@angular/core/testing';

import { SportimoService } from './sportimo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from './config.service';
import { ConfigServiceStub } from '../sections/contest-pages/contest-page-info/contest-page-info.component.spec';

describe('SportimoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[ { provide: ConfigService, useClass: ConfigServiceStub }]
  }));

  it('should be created', () => {
    const service: SportimoService = TestBed.get(SportimoService);
    expect(service).toBeTruthy();
  });
});
