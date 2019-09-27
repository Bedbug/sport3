import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeViewOverlayComponent } from './prize-view-overlay.component';

describe('PrizeViewOverlayComponent', () => {
  let component: PrizeViewOverlayComponent;
  let fixture: ComponentFixture<PrizeViewOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeViewOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeViewOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
