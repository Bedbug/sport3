import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAvatarsComponent } from './main-page-avatars.component';

describe('MainPageAvatarsComponent', () => {
  let component: MainPageAvatarsComponent;
  let fixture: ComponentFixture<MainPageAvatarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageAvatarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
