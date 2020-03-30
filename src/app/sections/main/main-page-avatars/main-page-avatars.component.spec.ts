import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAvatarsComponent } from './main-page-avatars.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { ConfigService } from 'src/app/services/config.service';
import { ConfigServiceStub } from '../../contest-pages/contest-page-info/contest-page-info.component.spec';

describe('MainPageAvatarsComponent', () => {
  let component: MainPageAvatarsComponent;
  let fixture: ComponentFixture<MainPageAvatarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageAvatarsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: SportimoService, useClass: SportimoServiceStub},
        { provide: ConfigService, useClass: ConfigServiceStub },
        {provide: TranslateService, useClass: TranslateServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
