import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchPagePlayComponent } from './match-page-play.component';
import { CardComponent } from './components/card/card.component'
// import { PlaycardComponent } from './components/playcard/playcard.component';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

describe('MatchPageCardsComponent', () => {
  let component: MatchPagePlayComponent;
  let fixture: ComponentFixture<MatchPagePlayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPagePlayComponent, CardComponent,
        //  PlaycardComponent 
        ],
      imports:[RouterTestingModule, IonRangeSliderModule],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub },       
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPagePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
