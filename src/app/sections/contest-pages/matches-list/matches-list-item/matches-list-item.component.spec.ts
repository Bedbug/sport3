import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchesListItemComponent } from './matches-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';

export class TranslateServiceStub{

	public get(key: any): any {
		return "_"+key;
	}
}


describe('MatchListItemComponent', () => {
  let component: MatchesListItemComponent;
  let fixture: ComponentFixture<MatchesListItemComponent>;
  
  let isClickable: boolean = false;
  beforeEach(waitForAsync(() => {
    
    TestBed.configureTestingModule({
      declarations: [ MatchesListItemComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: TranslateService, useClass: TranslateServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
