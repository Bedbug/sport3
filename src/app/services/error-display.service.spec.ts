import { TestBed } from '@angular/core/testing';

import { ErrorDisplayService } from './error-display.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '../components/matches-list/matches-list-item/matches-list-item.component.spec';

describe('ErrorDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[ToastrModule.forRoot()],
    providers:[
      // { provide: SportimoService, useClass: SportimoServiceStub },
      // { provide: ConfigService, useClass: ConfigServiceStub },
      { provide: TranslateService, useClass: TranslateServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: ErrorDisplayService = TestBed.get(ErrorDisplayService);
    expect(service).toBeTruthy();
  });
});
