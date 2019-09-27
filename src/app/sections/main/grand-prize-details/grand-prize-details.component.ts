import { Component, OnInit, Inject } from '@angular/core';
import { GrandPrize } from 'src/app/models/grand-prize';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilePreviewOverlayRef } from '../prize-view-overlay/prize-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from '../prize-view-overlay/prize-preview-overlay.tokens';
import { stringify } from 'querystring';

@Component({
  selector: 'app-grand-prize-details',
  templateUrl: './grand-prize-details.component.html',
  styleUrls: ['./grand-prize-details.component.scss']
})
export class GrandPrizeDetailsComponent implements OnInit {

  prize: GrandPrize;
  prizeID: string;
  countdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  }

  ngUnsubscribe = new Subject();
  userChances = 0;
  CountDownInterval;
  selectedPrize: any;

  constructor(
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.prizeID = this.route.snapshot.params['prizeid']
    console.log(this.data);
    if(this.data){
    this.prizeID = this.data;
    
    
    }

    this.sportimoService.getGrandPrizes()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.length > 0) {
          this.prize = data.find(x => x._id == this.prizeID);          
          this.startCountdownTimer();

          this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {          
            if (user)
              this.sportimoService.getGrandPrizeUserChances(this.prizeID)
                .subscribe(data => {
                  this.userChances = data || 0;
                })
                else
                this.userChances = 0;
          })

        }
      })
  }

  close(){
    this.dialogRef.close();
    this.cancel();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    clearInterval(this.CountDownInterval);
  }

  strippedPrizedText(text:string) {
    if (text){  
      let str:string = text.replace(/<\/?[^>]+(>|$)/g, "");
      if(str.length>100)
      str = str.substring(0,100)+"...";
      return str;
    }else
      return "";
  }

  selectPrize(prize: any) {
    this.selectedPrize = prize;
  }

  cancel() {
    this.selectedPrize = null;
  }

  startCountdownTimer() {
    // / Set the date we're counting down to
    console.log(this.prize.endToDate);

    var countDownDate = new Date(this.prize.endToDate).getTime();
    var that = this;
    clearInterval(this.CountDownInterval);

    // Update the count down every 1 second
    this.CountDownInterval = setInterval(function () {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      that.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      that.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      that.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      that.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(this.CountDownInterval);
        that.countdown.expired = true;
      }
    }, 1000);
  }

}
