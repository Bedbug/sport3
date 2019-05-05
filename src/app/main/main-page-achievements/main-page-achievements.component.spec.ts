import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAchievementsComponent } from './main-page-achievements.component';

describe('MainPageAchievementsComponent', () => {
  let component: MainPageAchievementsComponent;
  let fixture: ComponentFixture<MainPageAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageAchievementsComponent ]
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
