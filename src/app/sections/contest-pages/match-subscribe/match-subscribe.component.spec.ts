import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchSubscribeComponent } from './match-subscribe.component';

describe('MatchSubscribeComponent', () => {
  let component: MatchSubscribeComponent;
  let fixture: ComponentFixture<MatchSubscribeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
