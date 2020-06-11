import { Component, OnInit, Input } from '@angular/core';
import { PlayCard } from 'src/app/models/playcard';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { SportimoService } from 'src/app/services/sportimo.service';
import { Subscription } from 'rxjs/internal/Subscription';
import moment from 'moment-mini';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() cardData: PlayCard;

  sportUtils: SportimoUtils = new SportimoUtils();

  // When user has init process to play a special
  isPlayingSpecial: any;
  playcardSubscription: Subscription;

  currentPoints = null;

  // Activation Counter
  activationCount: any;
  activationScale: number;
  activationTimer: Subscription;
  terminationCount: number;
  terminationTimer: Subscription;
  cardTimerScale: number;

  specialCount: number;
  specialDPTimer: Subscription;
  specialDPScale: number;

  pointsTimeOut: any;

  pauseTimeout:any;

  getFormatedOption(text: string) {
    const home_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name[this.translate.currentLang] || this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name['en'];
    const away_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name[this.translate.currentLang] || this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name['en'];
    if (text)
      return text.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
    else return "__missing text";
  }

  // get curentCardPoints(){

  //   // if(!this.cardData)
  //   // return 0;

  //   if(this.cardData.status = 0){
  //     return this.cardData.startPoints;
  //   }

  //   if(this.cardData.status = 2){
  //     if(this.cardData.pointsAwarded)
  //     return this.cardData.pointsAwarded;
  //     else return 0;
  //   }

  // if(this.cardData.status == 1)
  // return this.cardData.startPoints;
  // }

  constructor(private sportimoService: SportimoService, public translate: TranslateService) { }

  ngOnInit() {
    this.pointsTimeOut = setTimeout(() => {
      // this.cardData.status = 0;
      // this.cardData.activationTime = moment().utc().add('30', 's').toDate();


      if (this.cardData && this.cardData.status != 2) {
        this.calculatePointsAndTimers();
      }
    });
  }

  count = 0;

  ngAfterViewInit() {
    // this.cardData.status = 0;
    // this.cardData.activationTime = moment().utc().add('30','s').toDate();

    // if (this.cardData.status != 2)
    //   this.calculatePointsAndTimers();
  }

  showEventTime = false;

  showCardDetails() {
    this.showEventTime = true;
    setTimeout(() => {
      this.showEventTime = false;
    }, 5000);
  }

  calculatePointsAndTimers() {

    // console.log(this.cardData.id + " | " + this.cardData.status);
    if (!this.cardData)
      return;

    if (this.cardData.status == 2) {
      clearTimeout(this.pointsTimeOut);
      return;
    }

    // if(this.cardData.status == 3){
    //   setTimeout(this.calculatePointsAndTimers,5000);
    // }

    // We need to deduct what timers are active
    if (this.cardData.status == 0) {
      // The card has not activated yet
      if (this.cardData.cardType == "Instant") {
        // It's the only type that needs activation timer
        let end = moment(this.cardData.activationTime).utc();
        let now = moment().utc();
        this.activationCount = Math.round(moment.duration(end.diff(now)).asSeconds());
        if (this.activationCount < 0) // activated already        
          this.cardData.status = 1;
        else {
          this.activationTimer = timer(1000, 1000).pipe(
            take(this.activationCount + 2)).subscribe(x => {
              this.activationScale = (x / this.activationCount) * 100;


              if (x == this.activationCount + 1) {
                this.activationTimer.unsubscribe();
                this.cardData.status = 1;
                this.activationScale = null;              
                this.calculatePointsAndTimers();
              }
            })
        }
      }
    }

    if ((this.cardData.status == 1 || this.cardData.status == 3) && this.cardData.cardType != "Overall") {
      // This card is activated
      let start = moment(this.cardData.activationTime).utc();
      let end = moment(this.cardData.terminationTime).utc();
      let now = moment().utc();

      if (this.cardData.status == 3) {
        now = moment(this.cardData.pauseTime).utc();
      }

      let realDuration = moment.duration(end.diff(start)).asSeconds();
      
      if(this.cardData.pauseTime && this.cardData.resumeTime)
      realDuration = moment.duration(moment.utc(this.cardData.pauseTime).diff(start)).asSeconds() +  moment.duration(end.diff(moment.utc(this.cardData.resumeTime))).asSeconds();

      let remainingDuration = moment.duration(end.diff(now)).asSeconds();

      let elapsedDuration = realDuration - remainingDuration;

      this.terminationCount = Math.round(moment.duration(end.diff(now)).asSeconds());

      // If card is paused just hold the score and bar at the pause incident
      if (this.cardData.status == 3) {
        const point_spread = this.cardData.startPoints - this.cardData.endPoints;
        const points_step = point_spread / (this.cardData.duration / 1000);

        this.currentPoints = Math.round((points_step * (this.terminationCount)) + this.cardData.endPoints);
        this.cardTimerScale = 100 - ((elapsedDuration / realDuration) * 100);
      
        //Repeat every second in case  the card status changes
       this.pauseTimeout = setTimeout(()=>this.calculatePointsAndTimers(), 1000);
      }

      if (this.cardData.status == 1)
        this.terminationTimer = timer(1000, 1000).pipe(
          take(this.terminationCount + 1)).subscribe(x => {

            if (this.cardData.status == 2) {
              this.terminationTimer.unsubscribe();
              this.currentPoints = this.cardData.pointsAwarded;
              return;
            }

            // If the termination time is moved forward -> recalculate card
            if (moment(this.cardData.terminationTime).utc() > end) {
              console.log("We have a change in time");
              this.terminationTimer.unsubscribe();
              this.calculatePointsAndTimers();
              return;
            }

            let timed = this.sportimoService.currentMatch.matchData.timeline[this.sportimoService.currentMatch.matchData.state].timed;
           
            // If we are an a segment that time is not running ignore progress until we resume
            if (!timed) {
              console.log("We have a change in segment");
              this.terminationTimer.unsubscribe();
              this.cardData.status = 3;
              this.cardData.pauseTime = moment().toDate();
              console.log("Pausing Card");
              
              this.calculatePointsAndTimers();
              return;
            }
    
            
            const point_spread = this.cardData.startPoints - this.cardData.endPoints;
            const points_step = point_spread / (this.cardData.duration / 1000);

            this.currentPoints = Math.round((points_step * (this.terminationCount - x)) + this.cardData.endPoints);
            this.cardTimerScale = 100 - (((elapsedDuration + x) / realDuration) * 100); //100 - (100 * (x / this.terminationCount));
            // console.log(elapsedDuration);
            // console.log(realDuration);
           
            if (this.cardTimerScale < 0.1) {
              this.cardData.status = 2;       
              this.terminationTimer.unsubscribe();
            }
          });
    }



  }

  setSpecialSPTimmer() {
    let timmerData = this.cardData.specials.DoublePoints;

    let start = moment(timmerData.creationTime).utc();
    let end = moment(timmerData.activationTime).utc();
    let now = moment().utc();

    let allDiff = moment.duration(end.diff(start)).asSeconds();
    let nowDiff = moment.duration(end.diff(now)).asSeconds();
    let traveledDiff = allDiff - nowDiff;

    this.specialCount = Math.round(moment.duration(end.diff(now)).asSeconds());

    this.specialDPTimer = timer(1000, 1000).pipe(
      take(this.specialCount + 1)).subscribe(x => {
        this.specialDPScale = 100 - (((traveledDiff + x) / allDiff) * 100); //100 - (100 * (x / this.terminationCount));
        console.log(this.specialDPScale);
        if (this.specialDPScale < 0.1) {
          this.cardData.specials.DoublePoints.status = 2;
          this.cardData.isDoublePoints = true;
          this.specialDPTimer.unsubscribe();
        }
      });
  }

  playSpecial(specialName: string) {


    if (this.isPlayingSpecial) return;

    if (this.cardData.status)

      if (specialName === "doublePoints" && this.cardData.isDoublePoints)
        return;
    if (specialName === "doubleTime" && this.cardData.isDoubleTime)
      return;

    const postData = {};
    postData[specialName] = true;
    this.isPlayingSpecial = true;
    console.log(specialName);
    this.playcardSubscription = this.sportimoService.playSpecial(this.cardData.id, postData)
      .subscribe(response => {
        console.log(this.cardData);
        console.log(response.userGameCard);
        this.cardData.specials = response.userGamecard.specials;
        if (this.cardData.specials.DoublePoints.status == 1) {
          this.setSpecialSPTimmer();
        }

        this.isPlayingSpecial = false;
      });
  }



  parseNumbers(text: string) {
    if (text)
      return this.sportUtils.parseNumbers(text, this.translate.currentLang == 'fa');
    else
      return "";
  }

  ngOnDestroy() {
    if (this.playcardSubscription)
      this.playcardSubscription.unsubscribe();

    if (this.activationTimer)
      this.activationTimer.unsubscribe();

    if (this.terminationTimer)
      this.terminationTimer.unsubscribe();

    if (this.specialDPTimer)
      this.specialDPTimer.unsubscribe();

      if(this.pauseTimeout)
      clearTimeout(this.pauseTimeout);
  }


}
