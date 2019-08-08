import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppickComponent } from './toppick.component';

describe('ToppickComponent', () => {
  let component: ToppickComponent;
  let fixture: ComponentFixture<ToppickComponent>;

  beforeEach(async(() => {
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
