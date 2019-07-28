import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPagesComponent } from './match-pages.component';
import { ContestInfoHeaderComponent } from '../contest-pages/contest-info-header/contest-info-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../contest-pages/contest-pages.component.spec';
import { ToastrModule } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from '../contest-pages/contest-page-info/contest-page-info.component.spec';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MatchPagesComponent', () => {
  let component: MatchPagesComponent;
  let fixture: ComponentFixture<MatchPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPagesComponent, ContestInfoHeaderComponent ],
      imports:[ RouterTestingModule, ToastrModule.forRoot(), HttpClientTestingModule, BrowserAnimationsModule],
      providers:[
        { provide: SportimoService, useClass: SportimoServiceStub },
        { provide: ConfigService, useClass: ConfigServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
