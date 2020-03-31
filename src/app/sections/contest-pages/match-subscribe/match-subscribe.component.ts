import { Component, OnInit, Inject } from '@angular/core';
import { FILE_PREVIEW_DIALOG_DATA } from '../../main/prize-view-overlay/prize-preview-overlay.tokens';
import { FilePreviewOverlayRef } from '../../main/prize-view-overlay/prize-preview-overlay-ref';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { takeUntil } from 'rxjs/operators';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { Router, ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ErrorDisplayService } from 'src/app/services/error-display.service';

@Component({
  selector: 'app-match-subscribe',
  templateUrl: './match-subscribe.component.html',
  styleUrls: ['./match-subscribe.component.scss']
})
export class MatchSubscribeComponent implements OnInit {
  contestMatch = null;
  isLoggedIn: boolean;
  user: User;
  isJoinRequesting = false;
  ngUnsubscribe = new Subject();
  Utils: SportimoUtils = new SportimoUtils();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private errorDisplay: ErrorDisplayService,
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any
  ) { }



  ngOnInit() {
    // if(this.data)
    // console.log(this.data);
    this.contestMatch = this.data;

    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.isLoggedIn = user != null;
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  requestJoin() {

    if (!this.isLoggedIn)
      this.errorDisplay.showError('101');
    else {
      this.isJoinRequesting = true;
      this.sportimoService.joinMatch(this.contestMatch.tournament, this.contestMatch._id).subscribe(x => {
        this.isJoinRequesting = false;
        console.log(x);

        if (x.match) {
          this.authenticationService.pay(this.contestMatch.subscriptionPrice);
          this.router.navigate(['/contest', this.contestMatch.tournament, 'match', this.contestMatch._id, 'info']);
          this.close();
        }
      });
    }

  }

  getCoins(){
    console.log("Get Coins");
    
  }

  close() {
    this.dialogRef.close();
  }

  parseDate(date: string) {
    return this.Utils.parseDate(date, this.translate.currentLang == 'fa', "DD/MM/YY, HH:MM", "jDD/jMM/jYY");
  }

  parseNumbers(text: string) {
    if (text)
      return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');
    else
      return "";
  }

}