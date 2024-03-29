import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPageAchievementsComponent } from './main-page-achievements.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../../contest-pages/contest-pages.component.spec';


describe('MainPageAchievementsComponent', () => {
  let component: MainPageAchievementsComponent;
  let fixture: ComponentFixture<MainPageAchievementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageAchievementsComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub }, 
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
