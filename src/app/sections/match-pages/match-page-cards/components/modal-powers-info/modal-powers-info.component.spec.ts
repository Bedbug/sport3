import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPowersInfoComponent } from './modal-powers-info.component';

describe('ModalPowersInfoComponent', () => {
  let component: ModalPowersInfoComponent;
  let fixture: ComponentFixture<ModalPowersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPowersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPowersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
