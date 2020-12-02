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
import { ConfigService } from 'src/app/services/config.service';

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
  routeCache: any;
  routePath: any;
  defaultProduct: any;
  onDemandResponse: boolean = false;
  currentOperator: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private errorDisplay: ErrorDisplayService,
    public dialogRef: FilePreviewOverlayRef,
    private configuration: ConfigService,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any
  ) { }



  ngOnInit() {
    // if(this.data)
    // console.log(this.data);    
    this.contestMatch = this.data.match;
    this.routeCache = this.data.route;
    this.routePath = this.data.routePath;
    this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.isLoggedIn = user != null;
      this.user = user;
      this.currentOperator = this.sportimoService.getConfigurationFor("operators").find(x => x.operatorCode == this.user.operatorId)
    });

    let inAppConfiguration = this.sportimoService.getConfigurationFor("inappProducts");
    if (inAppConfiguration.length > 0)
      this.defaultProduct = inAppConfiguration[0];


  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get hasInApp() {
    return this.currentOperator && this.currentOperator.webOnDemand;
  }

  requestJoin() {

    if (!this.isLoggedIn)
      this.errorDisplay.showError('101');
    else {
      // console.log("This");

      // console.log(this.routeCache);

      // this.router.navigate(['match',this.contestMatch._id,'info'],{relativeTo:this.routeCache});
      // return;
      this.isJoinRequesting = true;
      this.sportimoService.joinMatch(this.contestMatch.tournament._id || this.contestMatch.tournament, this.contestMatch._id).subscribe(x => {
        this.isJoinRequesting = false;

        if (x.match) {
          this.authenticationService.pay(this.contestMatch.subscriptionPrice);
          if (this.routePath)
            this.router.navigate(this.routePath, { relativeTo: this.routeCache });
          else
            this.router.navigate(['match', this.contestMatch._id, 'info'], { relativeTo: this.routeCache });
          this.close();
        }
      });
    }

  }

  getCoins() {
    this.isJoinRequesting = true;
    this.sportimoService.buyProduct(this.defaultProduct).subscribe(response => {
      this.isJoinRequesting = false;
      // Open the ondemand response modal
      this.onDemandResponse = true;
      // Start polling for user'wallet updates;
      this.authenticationService.startUserPolling();
    });
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
