import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMyteamsComponent } from './main-page-myteams.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub, AuthenticationServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from '../../contest-pages/contest-page-info/contest-page-info.component.spec';
import { User } from 'src/app/models/user';
import { of } from 'rxjs';
import { Component } from '@angular/core';

describe('MainPageMyteamsComponent', () => {
  let component: MainPageMyteamsComponent;
  let fixture: ComponentFixture<MainPageMyteamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageMyteamsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
      .compileComponents();
  }));

  let authenticationService: AuthenticationService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageMyteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    authenticationService = new AuthenticationService(<any>httpClientSpy, <any>ConfigServiceStub);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
