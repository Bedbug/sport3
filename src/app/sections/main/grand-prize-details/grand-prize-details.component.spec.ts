import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandPrizeDetailsComponent } from './grand-prize-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub, AuthenticationServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';

describe('GrandPrizeDetailsComponent', () => {
  let component: GrandPrizeDetailsComponent;
  let fixture: ComponentFixture<GrandPrizeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandPrizeDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandPrizeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
