import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContestPagesComponent } from './contest-pages.component';
import { ContestInfoHeaderComponent } from './contest-info-header/contest-info-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from './contest-page-info/contest-page-info.component.spec';
import { Contest } from 'src/app/models/contest';
import { ErrorDisplayService } from 'src/app/services/error-display.service';
import { ToastrModule } from 'ngx-toastr';

export class SportimoServiceStub {

  getGrandPrize() {
    return of(null);
  }

  getStandingsLeagues() {
    return of(null);
  }
  
  getContestDetails(id: string) {
    return of(null);
  }

  getContestQuickDetails(id: string) {
    return of(null);
  }

  getContestPrizes(id: string) {
    return of([]);
  }

  getContests() {
    return of([]);
  }

  getMessages() {
    return of([])
  }

  getAchievements() {
    return of({
      user: {
        achievements: null,
        stats: null
      }
    });
  }

  getPresentMatches(id: string) {
    return of([]);
  }

  getPastMatches(id: string) {
    return of([]);
  }

  getCurrentLiveMatchData(){
    return of(null);
  }

  getMatchDataForUser(id1:string, id2:string){
    return of(null);
  }

  getStream(){
    return of(null);
  }

  clearMatch(){
    
  }
}

export class AuthenticationServiceStub {
  get currentUser() {
    return of({
      _id: "testUserId",
      favTeams: []
    });
  }

  currentUserValue = {
    favTeams: []
  }
}


describe('ContestPagesComponent', () => {
  let component: ContestPagesComponent;
  let fixture: ComponentFixture<ContestPagesComponent>;


  // imports:[ToastrModule.forRoot()],
  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContestPagesComponent, ContestInfoHeaderComponent],
      imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
      
        { provide: SportimoService, useClass: SportimoServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
