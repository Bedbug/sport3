import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageInboxComponent } from './main-page-inbox.component';

describe('MainPageInboxComponent', () => {
  let component: MainPageInboxComponent;
  let fixture: ComponentFixture<MainPageInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
