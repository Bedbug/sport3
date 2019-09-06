import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorDisplayService {

  showError(errorCode: any) {

  //   this.translate.get(['errors.100']).subscribe(x => console.log(x));

  //   this.translate.get([
  //     'SampleField.Validation.MIN', 
  //     'SampleField.Validation.MAX'
  //   ], {
  //   // using hard coded value just as a sample
  //   min: 0, max: 2000
  // }).subscribe(translation => {
  //   console.log(translation);
  // });

    this.toastr.show(this.translate.instant('errors.'+errorCode), errorCode);
  }

  constructor(private toastr: ToastrService, public translate: TranslateService) {

    _('errors.100'); // "You must be logged in to access this page."
    _('errors.101'); // "You must be logged in in order to join a contest."
    _('errors.102'); // "You must have joined the contest in order to view matches"
    _('errors.103'); // "This is not a scheduled Demo match"
    
    _('errors.10002'); // "The card has already closed."

  }




}
