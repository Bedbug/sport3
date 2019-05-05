import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestInfoHeaderComponent } from './contest-info-header.component';

describe('ContestInfoHeaderComponent', () => {
  let component: ContestInfoHeaderComponent;
  let fixture: ComponentFixture<ContestInfoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestInfoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
