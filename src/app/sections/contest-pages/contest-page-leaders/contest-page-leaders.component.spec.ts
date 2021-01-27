import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContestPageLeadersComponent } from './contest-page-leaders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from '../contest-page-info/contest-page-info.component.spec';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';

describe('ContestPageLeadersComponent', () => {
  let component: ContestPageLeadersComponent;
  let fixture: ComponentFixture<ContestPageLeadersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPageLeadersComponent ],
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
    fixture = TestBed.createComponent(ContestPageLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
