import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeNoticeComponent } from './subscribe-notice.component';

describe('SubscribeNoticeComponent', () => {
  let component: SubscribeNoticeComponent;
  let fixture: ComponentFixture<SubscribeNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
