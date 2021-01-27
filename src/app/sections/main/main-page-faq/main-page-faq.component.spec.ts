import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPageFAQComponent } from './main-page-faq.component';

describe('MainPageFAQComponent', () => {
  let component: MainPageFAQComponent;
  let fixture: ComponentFixture<MainPageFAQComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
