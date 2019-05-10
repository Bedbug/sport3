import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandPrizeComponent } from './grand-prize.component';

describe('GrandPrizeComponent', () => {
  let component: GrandPrizeComponent;
  let fixture: ComponentFixture<GrandPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandPrizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
