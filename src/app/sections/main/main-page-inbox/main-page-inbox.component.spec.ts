import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageInboxComponent } from './main-page-inbox.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../../contest-pages/contest-pages.component.spec';

describe('MainPageInboxComponent', () => {
  let component: MainPageInboxComponent;
  let fixture: ComponentFixture<MainPageInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageInboxComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: SportimoService, useClass: SportimoServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
