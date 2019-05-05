import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPagePrizesComponent } from './contest-page-prizes.component';

describe('ContestPagePrizesComponent', () => {
  let component: ContestPagePrizesComponent;
  let fixture: ComponentFixture<ContestPagePrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPagePrizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPagePrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
