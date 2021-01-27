import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfigService } from 'src/app/services/config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent ],
      imports:[HttpClientTestingModule,BrowserAnimationsModule],
      providers:[AuthenticationService, ConfigService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
