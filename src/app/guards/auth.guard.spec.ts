import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../services/config.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '../sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, ConfigService,{provide: TranslateService, useClass: TranslateServiceStub}],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule,RouterTestingModule],
      
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
