import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageInfoComponent } from './contest-page-info.component';

describe('ContestPageInfoComponent', () => {
  let component: ContestPageInfoComponent;
  let fixture: ComponentFixture<ContestPageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
