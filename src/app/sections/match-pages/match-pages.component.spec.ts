import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPagesComponent } from './match-pages.component';

describe('MatchPagesComponent', () => {
  let component: MatchPagesComponent;
  let fixture: ComponentFixture<MatchPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
