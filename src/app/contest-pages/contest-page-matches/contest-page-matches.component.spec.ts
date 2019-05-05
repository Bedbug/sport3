import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageMatchesComponent } from './contest-page-matches.component';

describe('ContestPageMatchesComponent', () => {
  let component: ContestPageMatchesComponent;
  let fixture: ComponentFixture<ContestPageMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPageMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPageMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
