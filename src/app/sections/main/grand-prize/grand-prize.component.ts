import { Component, OnInit } from '@angular/core';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { GrandPrize } from 'src/app/models/grand-prize';
import { trigger, transition, query, style, stagger, animate, state } from '@angular/animations';

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

  constructor(private SportimoApi: SportimoApiService) { }

  ngOnInit() {
    this.SportimoApi.getGrandPrize()
      .subscribe(data => {
        this.prize = data;
        this.startCountdownTimer();
      })
  }


  startCountdownTimer() {
    // / Set the date we're counting down to
    var countDownDate = this.prize.endToDate.getTime();
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
