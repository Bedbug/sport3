import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesListItemComponent } from './matches-list-item.component';

describe('MatchListItemComponent', () => {
  let component: MatchesListItemComponent;
  let fixture: ComponentFixture<MatchesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
