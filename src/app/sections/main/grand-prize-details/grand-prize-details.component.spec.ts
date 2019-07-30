import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandPrizeDetailsComponent } from './grand-prize-details.component';

describe('GrandPrizeDetailsComponent', () => {
  let component: GrandPrizeDetailsComponent;
  let fixture: ComponentFixture<GrandPrizeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandPrizeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandPrizeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
