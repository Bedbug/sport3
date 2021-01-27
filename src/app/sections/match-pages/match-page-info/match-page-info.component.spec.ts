import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchPageInfoComponent } from './match-page-info.component';
import { StatsComponent } from 'src/app/components/stats/stats.component';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';

describe('MatchPageInfoComponent', () => {
  let component: MatchPageInfoComponent;
  let fixture: ComponentFixture<MatchPageInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageInfoComponent, StatsComponent ],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub },       
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
