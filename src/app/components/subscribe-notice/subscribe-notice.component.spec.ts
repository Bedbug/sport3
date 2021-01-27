import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubscribeNoticeComponent } from './subscribe-notice.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../services/config.service';
import { ConfigServiceStub } from '../../sections/contest-pages/contest-page-info/contest-page-info.component.spec';

describe('SubscribeNoticeComponent', () => {
  let component: SubscribeNoticeComponent;
  let fixture: ComponentFixture<SubscribeNoticeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeNoticeComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useClass: ConfigServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
