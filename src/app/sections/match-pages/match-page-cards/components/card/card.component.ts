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

  getFormatedOption(text: string) {
    const home_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.home_team.name[this.translate.currentLang];
    const away_team = this.sportimoService.getCurrentLiveMatchData().value.matchData.away_team.name[this.translate.currentLang];
    return text.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
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
    // console.log(this.cardData);
    setTimeout(() => {
      // this.cardData.status = 0;
      // this.cardData.activationTime = moment().utc().add('30', 's').toDate();


      if (this.cardData && this.cardData.status != 2) {
        this.calculatePointsAndTimers();
      }
    });
  }

  ngAfterViewInit() {
    // this.cardData.status = 0;
    // this.cardData.activationTime = moment().utc().add('30','s').toDate();

    // if (this.cardData.status != 2)
    //   this.calculatePointsAndTimers();
  }

  calculatePointsAndTimers() {
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
                this.cardData.status = 1;
                this.activationScale = null;
                this.calculatePointsAndTimers();
              }
            })
        }
      }
    }

    if (this.cardData.status == 1) {
      // This card is activated
      const point_spread = this.cardData.startPoints - this.cardData.endPoints;
      const points_step = point_spread / (this.cardData.duration / 1000);

      let start = moment(this.cardData.activationTime).utc();
      let end = moment(this.cardData.terminationTime).utc();
      let now = moment().utc();

      let allDiff = moment.duration(end.diff(start)).asSeconds();
      let nowDiff = moment.duration(end.diff(now)).asSeconds();
      let traveledDiff = allDiff - nowDiff;

      this.terminationCount = Math.round(moment.duration(end.diff(now)).asSeconds());

      this.terminationTimer = timer(1000, 1000).pipe(
        take(this.terminationCount + 1)).subscribe(x => {
          this.currentPoints = Math.round((points_step * (this.terminationCount - x)) + this.cardData.endPoints);
          this.cardTimerScale = 100 - (((traveledDiff + x) / allDiff) * 100); //100 - (100 * (x / this.terminationCount));
          if (this.cardTimerScale < 0.1)
            this.cardData.status = 2;
        });
    }

  }

  playSpecial(specialName: string) {
    if (this.isPlayingSpecial) return;

    if(this.cardData.status)

    if (specialName === "doublePoints" && this.cardData.isDoublePoints)
      return;
    if (specialName === "doubleTime" && this.cardData.isDoubleTime)
      return;

    const postData = {};
    postData[specialName] = true;
    this.isPlayingSpecial = true;

    this.playcardSubscription = this.sportimoService.playSpecial(this.cardData.id, postData)
      .subscribe(response => {
        console.log(response);
        this.isPlayingSpecial = false;
      });

  }

  ngOnDestroy() {
    if (this.playcardSubscription)
      this.playcardSubscription.unsubscribe();

    if (this.activationTimer)
      this.activationTimer.unsubscribe();

    if (this.terminationTimer)
      this.terminationTimer.unsubscribe();
  }


}
