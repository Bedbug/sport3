import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '../../sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';
import { ConfigServiceStub } from 'src/app/sections/contest-pages/contest-page-info/contest-page-info.component.spec';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule,ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ConfigService, useClass: ConfigServiceStub },
        {provide: TranslateService, useClass: TranslateServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
