import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { GrandPrize } from 'src/app/models/grand-prize';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

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
  countdown: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  }

  ngUnsubscribe = new Subject();


  constructor(private sportimoService: SportimoService, public translate: TranslateService) { }

  ngOnInit() {
    this.sportimoService.getGrandPrize()
      .subscribe(data => {
        if (data != null && data.length > 0) {
          this.prize = data[0];
          this.startCountdownTimer();
        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  startCountdownTimer() {
    // / Set the date we're counting down to
    console.log(this.prize.endToDate);
    
    var countDownDate = new Date(this.prize.endToDate).getTime();
    var that = this;
    clearInterval(x);

    // Update the count down every 1 second
    var x = setInterval(function () {

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
        clearInterval(x);
        that.countdown.expired = true;
      }
    }, 1000);
  }

}
