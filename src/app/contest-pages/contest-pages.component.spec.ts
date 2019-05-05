import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPagesComponent } from './contest-pages.component';

describe('ContestPagesComponent', () => {
  let component: ContestPagesComponent;
  let fixture: ComponentFixture<ContestPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
