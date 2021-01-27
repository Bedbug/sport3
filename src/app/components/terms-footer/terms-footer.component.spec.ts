import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TermsFooterComponent } from './terms-footer.component';

describe('TermsFooterComponent', () => {
  let component: TermsFooterComponent;
  let fixture: ComponentFixture<TermsFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
