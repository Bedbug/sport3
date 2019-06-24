import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageProfileComponent } from './main-page-profile.component';
import { SportimoService } from 'src/app/services/sportimo.service';
import { SportimoServiceStub, AuthenticationServiceStub } from '../../contest-pages/contest-pages.component.spec';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/components/matches-list/matches-list-item/matches-list-item.component.spec';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainPageProfileComponent', () => {
  let component: MainPageProfileComponent;
  let fixture: ComponentFixture<MainPageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageProfileComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, NgxChartsModule, ChartsModule],
      providers: [
        { provide: SportimoService, useClass: SportimoServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
