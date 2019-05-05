import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageStandingsComponent } from './main-page-standings.component';

describe('MainPageStandingsComponent', () => {
  let component: MainPageStandingsComponent;
  let fixture: ComponentFixture<MainPageStandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageStandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
