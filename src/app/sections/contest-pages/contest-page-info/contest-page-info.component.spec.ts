import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageInfoComponent } from './contest-page-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoService } from 'src/app/services/sportimo.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/sections/contest-pages/matches-list/matches-list-item/matches-list-item.component.spec';


export class ConfigServiceStub {
  // getApi(key:string) {
  //   return "https://clientserver-3.herokuapp.com/v1";
  // }

  getApi(key: string): string {
    return "https://clientserver-3.herokuapp.com/v1";
}

  getClient(){
    return '';
  }
}

describe('ContestPageInfoComponent', () => {
  let component: ContestPageInfoComponent;
  let fixture: ComponentFixture<ContestPageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestPageInfoComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthenticationService,
        SportimoService,
        { provide: ConfigService, useClass: ConfigServiceStub },
        {provide: TranslateService, useClass: TranslateServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
