import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToppickComponent } from './toppick.component';

describe('ToppickComponent', () => {
  let component: ToppickComponent;
  let fixture: ComponentFixture<ToppickComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToppickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToppickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
