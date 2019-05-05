import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageLeadersComponent } from './contest-page-leaders.component';

describe('ContestPageLeadersComponent', () => {
  let component: ContestPageLeadersComponent;
  let fixture: ComponentFixture<ContestPageLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPageLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPageLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
