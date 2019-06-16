import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPagePrizesComponent } from './contest-page-prizes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub } from '../contest-pages.component.spec';


describe('ContestPagePrizesComponent', () => {
  let component: ContestPagePrizesComponent;
  let fixture: ComponentFixture<ContestPagePrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPagePrizesComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        {provide: SportimoService, useClass: SportimoServiceStub},
        {provide: TranslateService, useClass: TranslateServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPagePrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
