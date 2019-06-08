import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMyteamsComponent } from './main-page-myteams.component';

describe('MainPageMyteamsComponent', () => {
  let component: MainPageMyteamsComponent;
  let fixture: ComponentFixture<MainPageMyteamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageMyteamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageMyteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
