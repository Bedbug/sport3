// import { Component, OnInit, Input } from '@angular/core';
// import { trigger, transition, style, animate } from '@angular/animations';
// import { PlayCard } from 'src/app/models/playcard';
// import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
// import { utils } from 'protractor';
// import { SportimoService } from 'src/app/services/sportimo.service';
// import { TranslateService } from '@ngx-translate/core';
// import { timer, Subject } from 'rxjs';
// import { take, takeUntil } from 'rxjs/operators';
// import { LiveMatch } from 'src/app/models/live-match';

// @Component({
//   selector: 'app-playcard',
//   templateUrl: './playcard.component.html',
//   styleUrls: ['./playcard.component.scss'],
//   animations: [
//     trigger(
//       'fadein', [
//         transition(':enter', [
//           style({ opacity: 0 }),
//           animate('300ms', style({ opacity: 1 }))
//         ]),
//         // transition(':leave', [
//         //   style({ opacity: 1}),
//         //   animate('500ms', style({opacity: 0}))
//         // ])
//       ]
//     )
//   ]
// })
// export class PlaycardComponent implements OnInit {

//   @Input() data: PlayCard;
//   Utils: SportimoUtils = new SportimoUtils();
//   playCardModal: boolean = false;
//   selectedTime: number = 1;
//   cardSelections: any = {};
//   isSubmitingCard: boolean = false;
//   minTimeValue: number = 1;
//   fromTimeValue: number = 1;
//   liveMatch: LiveMatch;
//   ngUnsubscribe = new Subject();


//   openPlayModal() {
//     this.selectedTime = this.getMinimumTime();
//     this.playCardModal = true;
//   }

//   closeModal() {
//     if (this.isSubmitingCard) return;
//     this.playCardModal = false;
//   }

//   valueChanged(e) {
//     this.selectedTime = e.from;
//   }

//   get SelectedTime() {
//     if (!this.sportimoService.currentMatch)
//       return 0;

//     if (this.selectedTime == this.minTimeValue && this.sportimoService.currentMatch.matchData.state > 0)
//       return "Now";
//     else
//       return this.selectedTime + "'";
//   }

//   getMinimumTime() {
//     if (!this.sportimoService.currentMatch)
//       return 0;
//     this.minTimeValue = this.sportimoService.currentMatch.matchData.time; //this.sportimoService.currentMatch.matchData.time;   
//     if (this.minTimeValue == null || this.minTimeValue == 0) this.minTimeValue = 1;
//     if (this.fromTimeValue < this.minTimeValue) this.fromTimeValue = this.minTimeValue;
//     return this.minTimeValue;
//   }

//   getFormatedOption(optionText: string) {
//     if (!this.sportimoService.currentMatch)
//       return '';
//     const home_team = this.sportimoService.currentMatch.matchData.home_team.name[this.translate.currentLang];
//     const away_team = this.sportimoService.currentMatch.matchData.away_team.name[this.translate.currentLang];
//     if (optionText)
//       return optionText.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
//     else return optionText;
//   }

//   cancelAll() {
//     this.cardSelections.isDoublePoints = false;
//     this.cardSelections.isDoubleTime = false;
//     this.cardSelections.optionId = null;
//     this.isSubmitingCard = false;
//   }

//   optionSelect(option: string) {
//     this.cardSelections.optionId = option;
//     this.cardSelections.gamecardDefinitionId = this.data._id;
//   }

//   get optionSelected() {
//     return this.data.options.find(x => x.optionId == this.cardSelections.optionId)
//   }

//   submitCard() {
//     this.isSubmitingCard = true;
//     this.cardSelections.minute = this.selectedTime;
//     this.sportimoService.submitUserCard(this.cardSelections)
//       .subscribe(playedCard => {
//         this.isSubmitingCard = false;
//         this.closeModal();
//       }
//         , error => console.log('Error'))
//   }

//   constructor(private sportimoService: SportimoService, public translate: TranslateService) {

//   }

//   ngOnInit() {
//     this.selectedTime = this.getMinimumTime();

//     //Update minimum values
//     this.sportimoService.getCurrentLiveMatchData().pipe(takeUntil(this.ngUnsubscribe)).subscribe(match => {
//       if (match) {
//         this.liveMatch = match;
//         this.minTimeValue = this.liveMatch.matchData.time;
//         if (this.selectedTime < this.minTimeValue) this.selectedTime = this.minTimeValue;
//       }
//     })

//     // timer(0, 60000).pipe(
//     //     take(15)).subscribe(x => {
//     //       this.matchTime ++;
//     //       console.log(this.matchTime);
//     //       this.minTimeValue = this.matchTime;
//     //       // if(this.fromTimeValue<this.minTimeValue) this.fromTimeValue = this.minTimeValue;
//     //       if(this.selectedTime<this.matchTime)this.selectedTime = this.matchTime;
//     //     })
//   }

//   ngOnDestroy() {
//     this.ngUnsubscribe.next();
//     this.ngUnsubscribe.complete();
//   }


// }
