import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageProfileComponent } from './main-page-profile.component';

describe('MainPageProfileComponent', () => {
  let component: MainPageProfileComponent;
  let fixture: ComponentFixture<MainPageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
