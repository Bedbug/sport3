import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestInfoHeaderComponent } from './contest-info-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { ConfigServiceStub } from '../contest-page-info/contest-page-info.component.spec';
import { ToastrModule } from 'ngx-toastr';


describe('ContestInfoHeaderComponent', () => {
  let component: ContestInfoHeaderComponent;
  let fixture: ComponentFixture<ContestInfoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestInfoHeaderComponent ],
      imports: [ToastrModule.forRoot(),HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: TranslateService, useClass: TranslateServiceStub},  { provide: ConfigService, useClass: ConfigServiceStub }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
