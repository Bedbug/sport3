import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPageLeadersComponent } from './match-page-leaders.component';

describe('MatchPageLeadersComponent', () => {
  let component: MatchPageLeadersComponent;
  let fixture: ComponentFixture<MatchPageLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPageLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
