import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPageCardsComponent } from './match-page-cards.component';
import { CardComponent } from './components/card/card.component'
import { PlaycardComponent } from './components/playcard/playcard.component';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

describe('MatchPageCardsComponent', () => {
  let component: MatchPageCardsComponent;
  let fixture: ComponentFixture<MatchPageCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageCardsComponent, CardComponent, PlaycardComponent ],
      imports:[RouterTestingModule, IonRangeSliderModule],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub },       
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
