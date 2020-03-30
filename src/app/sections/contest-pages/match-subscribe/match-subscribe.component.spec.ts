import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSubscribeComponent } from './match-subscribe.component';

describe('MatchSubscribeComponent', () => {
  let component: MatchSubscribeComponent;
  let fixture: ComponentFixture<MatchSubscribeComponent>;

  beforeEach(async(() => {
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
