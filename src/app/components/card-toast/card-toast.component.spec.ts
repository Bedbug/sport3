import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardToastComponent } from './card-toast.component';

describe('CardToastComponent', () => {
  let component: CardToastComponent;
  let fixture: ComponentFixture<CardToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
