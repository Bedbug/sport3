import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchPageLeadersComponent } from './match-page-leaders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from '../../contest-pages/contest-page-info/contest-page-info.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';

describe('MatchPageLeadersComponent', () => {
  let component: MatchPageLeadersComponent;
  let fixture: ComponentFixture<MatchPageLeadersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageLeadersComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        AuthenticationService,
        SportimoService,
        { provide: ConfigService, useClass: ConfigServiceStub },
        {provide: TranslateService, useClass: TranslateServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPageLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
