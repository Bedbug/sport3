import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPageInfoComponent } from './match-page-info.component';

describe('MatchPageInfoComponent', () => {
  let component: MatchPageInfoComponent;
  let fixture: ComponentFixture<MatchPageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
