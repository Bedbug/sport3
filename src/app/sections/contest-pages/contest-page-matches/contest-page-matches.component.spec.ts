import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageMatchesComponent } from './contest-page-matches.component';
import { MatchesListComponent } from 'src/app/sections/contest-pages/matches-list/matches-list.component';
import { MatchesListItemComponent } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../contest-pages.component.spec';

describe('ContestPageMatchesComponent', () => {
  let component: ContestPageMatchesComponent;
  let fixture: ComponentFixture<ContestPageMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPageMatchesComponent, MatchesListComponent, MatchesListItemComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        {provide: SportimoService, useClass: SportimoServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub}
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPageMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
