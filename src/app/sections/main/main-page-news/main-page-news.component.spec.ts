import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPageNewsComponent } from './main-page-news.component';

describe('MainPageNewsComponent', () => {
  let component: MainPageNewsComponent;
  let fixture: ComponentFixture<MainPageNewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
