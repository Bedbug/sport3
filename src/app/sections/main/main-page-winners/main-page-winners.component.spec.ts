import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPageWinnersComponent } from './main-page-winners.component';

describe('MainPageWinnersComponent', () => {
  let component: MainPageWinnersComponent;
  let fixture: ComponentFixture<MainPageWinnersComponent>;

  beforeEach(waitForAsync(() => {
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
