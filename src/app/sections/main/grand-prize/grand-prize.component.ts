import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { GrandPrize } from 'src/app/models/grand-prize';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PrizeViewOverlayService } from '../prize-view-overlay/prize-view-overlay.service';
import { FilePreviewOverlayRef } from '../prize-view-overlay/prize-preview-overlay-ref';
import { GrandPrizeDetailsComponent } from '../grand-prize-details/grand-prize-details.component';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';

@Component({
  selector: 'app-grand-prize',
  templateUrl: './grand-prize.component.html',
  styleUrls: ['./grand-prize.component.scss'],
  animations: [
    trigger(
      'fadein', [
        state('true', style({ opacity: 1 })),
        state('false', style({ opacity: 0 })),
        transition('false <=> true', animate(500))
      ]),
  ]
})
export class GrandPrizeComponent implements OnInit {

  prize: GrandPrize;
  prizeDetailImage: String;

  countdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  }
  CountDownInterval;

  ngUnsubscribe = new Subject();
  userChances = 0;

  Utils: SportimoUtils = new SportimoUtils();
  
  constructor(
    private router: Router,
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private prizeViewOverlay: PrizeViewOverlayService
  ) { }

  ngOnInit() {
    this.sportimoService.getGrandPrizes()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.length > 0) {
          this.prize = data.find(each=>each.isMajor==true) || data[0];   
          // 5fca19d9b7eb6600172b4e73     
          this.prizeDetailImage = this.prize?.promoDetailImage || './assets/images/contest-bg.png';          
          
          this.startCountdownTimer();

          this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
            if (user)
              this.sportimoService.getGrandPrizeUserChances(this.prize._id)
                .subscribe(data => {
                  this.userChances = data || 0;
                })
            else
              this.userChances = 0;
          })

        }else{
          this.prizeDetailImage = './assets/images/contest-bg.png';
        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    clearInterval(this.CountDownInterval);
  }
  

  showPrizeDetails(prizeid: string) {
    
    this.prizeViewOverlay.open<GrandPrizeDetailsComponent>(GrandPrizeDetailsComponent,{data:prizeid});
    // this.router.navigate(['main/grand-prize/', prizeid]);
  }

  
  startCountdownTimer() {
    // / Set the date we're counting down to
 

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

  parseNumbers(text:string){
    if(!text)
    text = "0";
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

}
