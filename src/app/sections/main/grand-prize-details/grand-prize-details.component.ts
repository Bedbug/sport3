import { Component, OnInit } from '@angular/core';
import { GrandPrize } from 'src/app/models/grand-prize';
import { SportimoService } from 'src/app/services/sportimo.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

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
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.prizeID = this.route.snapshot.params['prizeid']
    
    if(this.prizeID == "1")
    this.prizeID = "5d2f080ff2a2969010a16204";


    this.sportimoService.getGrandPrize()
      .subscribe(data => {
        if (data != null && data.length > 0) {


          this.prize = data.find(x => x._id == this.prizeID);
          console.log(this.prize);
          this.startCountdownTimer();

          // this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {          
          //   if (user)
          //     this.sportimoService.getGrandPrizeUserChances(data[0]._id)
          //       .subscribe(data => {
          //         this.userChances = data || 0;
          //       })
          //       else
          //       this.userChances = 0;
          // })

        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    clearInterval(this.CountDownInterval);
  }

  strippedPrizedText(text:string) {
    if (text){      
      return text.replace(/<\/?[^>]+(>|$)/g, "");
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
