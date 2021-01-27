import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
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
    
    this.toastr.show(this.translate.instant('errors.'+errorCode), "");//errorCode
  }

  constructor(private toastr: ToastrService, public translate: TranslateService) {
    _('Now');
    _('contest_loc_key');
    _('grandprize_loc_key');
    _('errors.100'); // "You must be logged in to access this page."
    _('errors.101'); // "You must be logged in in order to join a contest."
    _('errors.102'); // "You must have joined the contest in order to view matches"
    _('errors.103'); // "This is not a scheduled Demo match"
    _('errors.104');

    _('errors.1002');
    _('errors.1007');

    _('errors.10002'); // "The card has already closed."
    _('errors.10001'); // "The card has already closed."
    _('errors.10005');
    _('errors.10006');
    _('errors.10007');

    _('errors.4000');
    _('errors.4001');
    _('errors.4002');
    _('errors.4003');
    _('errors.4004');

    _('errors.4040');
    _('errors.4041');
    _('errors.4042');
    _('errors.4043');
    _('errors.4044');
    _('errors.4045');

    _('errors.4050');
    _('errors.4051');
    _('errors.4052');
    _('errors.4053');
    _('errors.4054');
    _('errors.4055');
    _('errors.4056');
    _('errors.4057');
    _('errors.4058');

    _('errors.4060');
    _('errors.4061');
    _('errors.4062');




    _('tip.1');
    _('tip.2');

  }




}
