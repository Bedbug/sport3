import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageStandingsComponent } from './main-page-standings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub, AuthenticationServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';

describe('MainPageStandingsComponent', () => {
  let component: MainPageStandingsComponent;
  let fixture: ComponentFixture<MainPageStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageStandingsComponent ],
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
    fixture = TestBed.createComponent(MainPageStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
