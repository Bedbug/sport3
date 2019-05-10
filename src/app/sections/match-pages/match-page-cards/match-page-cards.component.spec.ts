import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPageCardsComponent } from './match-page-cards.component';

describe('MatchPageCardsComponent', () => {
  let component: MatchPageCardsComponent;
  let fixture: ComponentFixture<MatchPageCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageCardsComponent ]
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
