import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPageInfoComponent } from './contest-page-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SportimoService } from 'src/app/services/sportimo.service';


export class ConfigServiceStub {
  getApi(key:string) {
    return '';
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
        { provide: ConfigService, useClass: ConfigServiceStub }
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
