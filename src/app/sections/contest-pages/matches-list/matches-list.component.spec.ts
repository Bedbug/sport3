import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchesListComponent } from './matches-list.component';
import { TranslateService } from '@ngx-translate/core';
import { MatchesListItemComponent } from './matches-list-item/matches-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateServiceStub } from './matches-list-item/matches-list-item.component.spec';

describe('MatchesListComponent', () => {
  let component: MatchesListComponent;
  let fixture: ComponentFixture<MatchesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesListComponent, MatchesListItemComponent ],
      imports:[BrowserAnimationsModule],
      providers: [{provide: TranslateService, useClass: TranslateServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesListComponent);
    component = fixture.componentInstance;
    component.present = [];
    component.past = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
