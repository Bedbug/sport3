import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageWinnersComponent } from './main-page-winners.component';

describe('MainPageWinnersComponent', () => {
  let component: MainPageWinnersComponent;
  let fixture: ComponentFixture<MainPageWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
