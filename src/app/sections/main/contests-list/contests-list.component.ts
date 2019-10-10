import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/models/contest';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GrandPrize } from 'src/app/models/grand-prize';

@Component({
  selector: 'app-contests-list',
  templateUrl: './contests-list.component.html',
  styleUrls: ['./contests-list.component.scss'],
  animations: [
    trigger(
      'staggerAnimation', [
        transition('* => *', [
          query(':enter', style({ opacity: 0 }), { optional: true }),
          query(
            ':enter',
            stagger(
              '200ms', [
                animate('300ms', style({ opacity: 1 }))
              ]), { optional: true }),
          query(':leave', stagger('200ms', [
            animate('300ms', style({ opacity: 0 }))
          ]), { optional: true })
        ]),
      ]
    )
  ]
})
export class ContestsListComponent implements OnInit {

  contests: Contest[];
  ngUnsubscribe = new Subject();
  prizes: GrandPrize[];
  countdownTimers: any[];
  
  constructor(
    private sportimoService: SportimoService,
    private router: Router,
    public translate: TranslateService,
    private authenticationService:AuthenticationService
  ) { }


  ngOnInit() {

    this.sportimoService.getContests()
      .subscribe(data => {
        this.contests = data;
      })

    this.sportimoService.getGrandPrizes()
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data != null && data.length > 0) {
          this.prizes = data.filter(each=> !each.isMajor);        
                    
          this.startCountdownTimers();

          // If and when the user logs in we should update their chances.
          this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
            if (user)
            this.prizes.forEach(eachPrize=>{
              if(user)
              this.sportimoService.getGrandPrizeUserChances(eachPrize._id)
              .subscribe(data => {
                eachPrize.chances = data || 0;
              })
              else
                eachPrize.chances = 0
            })
              
            
          })

        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.prizes.forEach(prize=>{
      clearInterval(prize.timer);
    })
  }
  
  startCountdownTimers() {
    // / Set the date we're counting down to
    // console.log(this.prizes);
    this.prizes.forEach(prize => {
      var that = prize;
      prize.countDownEndDate = new Date(prize.endToDate).getTime();
      clearInterval(prize.timer);
      // Update the count down every 1 second
      prize.timer = setInterval(function () {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = that.countDownEndDate - now;
      if(!that.countdown) that.countdown = {};
      // Time calculations for days, hours, minutes and seconds

      that.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      that.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      that.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      that.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // console.log(that.countdown);
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(this.CountDownInterval);
        that.countdown.expired = true;
      }
    }, 1000);
    });
   
   
    

    
  }

  showPrizeDetails(prizeid: string) {

    this.router.navigate(['main/grand-prize/', prizeid]);
  }

  ContestClicked(contestId) {
    this.router.navigate(['/contest', contestId, 'matches']);
  }
}
