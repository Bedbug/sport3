import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandPrizeComponent } from './grand-prize.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from '../../contest-pages/contest-page-info/contest-page-info.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GrandPrizeComponent', () => {
  let component: GrandPrizeComponent;
  let fixture: ComponentFixture<GrandPrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GrandPrizeComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
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
