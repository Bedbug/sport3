import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { PlayCard } from 'src/app/models/playcard';
import { ActivatedRoute } from '@angular/router';
import { LiveMatch } from 'src/app/models/live-match';
import { TranslateService } from '@ngx-translate/core';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorDisplayService } from 'src/app/services/error-display.service';
import { PrizeViewOverlayService } from '../../main/prize-view-overlay/prize-view-overlay.service';
import { ModalPowersInfoComponent } from '../match-page-cards/components/modal-powers-info/modal-powers-info.component';

@Component({
  selector: 'app-match-page-play',
  templateUrl: './match-page-play.component.html',
  styleUrls: ['./match-page-play.component.scss'],
  animations: [
    trigger(
      'fadein', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      // transition(':leave', [
      //   style({ opacity: 1}),
      //   animate('500ms', style({opacity: 0}))
      // ])
    ]
    )
  ]
})
export class MatchPagePlayComponent implements OnInit {

  contestMatchId: string;
  contestId: string;
  // User is playing a card
  isPlayingCard: boolean = false;
  isLoadingCards: boolean = false;
  availableCards: PlayCard[] = [];
  liveMatch: LiveMatch;

  playCardModal: boolean = false;
  selectedTime: number = 1;
  isSubmitingCard: boolean = false;
  minTimeValue: number = 1;
  fromTimeValue: number = 1;
  cardSelections: any = {};
  selectedCard: any;

  Utils: SportimoUtils = new SportimoUtils();
  appName: any;

  // @ViewChild('stickyMenu') menuElement: ElementRef;

  // sticky: boolean = false;
  // menuPosition: any;
  get subscribed(){
    return (!this._subscribed && this._gracePeriod>0) || this._subscribed;
  }

  _gracePeriod:number = 0;
  _subscribed:boolean = false;
  checkingSubscription: boolean = true;
  ngUnsubscribe = new Subject();
  hasClickedPlay: boolean = false;
  hasJoinedContest: string;
  showPlayCardsPop: boolean;
  userScore: number;
  tempPowersUsed: number = 0;
  prevBetState: boolean;

  constructor(
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private ViewModalOverlay: PrizeViewOverlayService,
    private errorService: ErrorDisplayService) {
  }

  ngOnInit() {

    localStorage.setItem("hasClickedPlay", "true");

    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");
    })

    this.sportimoService.getCurrentLiveMatchData()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.liveMatch = x;
        this.userScore = this.sportimoService.getMatchScore();

        // Moved Here in order to update cards if there is a change in Bet State
        if (this.liveMatch && this.prevBetState != this.liveMatch.matchData.noBet) {
          this.playCard();
          this.prevBetState = this.liveMatch.matchData.noBet
        }
      });


    this.appName = this.sportimoService.getConfigurationFor('appName');
    
    this.hasJoinedContest = localStorage.getItem("hasClickedCard");
    this.showPlayCardsPop = !this.hasJoinedContest;
    this.checkingSubscription = true;
    
    this.authenticationService.currentUser
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
     
        if (user != null) {
          // this.isSubscribed = (user && user.subscriptionEnd && moment(user.subscriptionEnd).utc() > moment().utc())
          // this.subscribed = this.authenticationService.isSubscribed;
          this.authenticationService.validateUserSubscription().subscribe(x=>{  
            console.log(x);
                      
            this._subscribed = x.success;
            this._gracePeriod = x.gracePeriod;
            this.checkingSubscription = false;
          })
          // console.log("user is:"+user);
        }
      })

    // this.playCard();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openPowersInfo() {
    this.ViewModalOverlay.open<ModalPowersInfoComponent>(ModalPowersInfoComponent, { data: null });
    // this.router.navigate(['main/grand-prize/', prizeid]);
  }

  playCard() {
    this.isPlayingCard = true;
    this.isLoadingCards = true;
    this.availableCards = [];
    this.sportimoService.getAvailableCards(this.contestId, this.contestMatchId).subscribe(availableCards => {
      this.availableCards = availableCards;
      this.isLoadingCards = false;
    })
  }

  get availableCardPlays() {
    if (!this.liveMatch)
      return "";
    return this.liveMatch.matchData.settings.gameCards.totalcards - this.liveMatch.playedCards.length;
  }

  get availableSpecialPlays() {
    if (!this.liveMatch)
      return "";
    var doublePointsUsed = this.liveMatch.playedCards.filter(x => x.isDoublePoints).length;
    var doubleTimeUsed = this.liveMatch.playedCards.filter(x => x.isDoubleTime).length;
    var specialsUsed = doublePointsUsed + doubleTimeUsed;
    return this.liveMatch.matchData.settings.gameCards.specials - specialsUsed - this.tempPowersUsed;
  }

  toggleDoublePoints(cardSelections) {
    console.log(this.availableSpecialPlays, cardSelections.isDoublePoints);

    if (this.availableSpecialPlays > 0 && !cardSelections.isDoublePoints) {
      cardSelections.isDoublePoints = true;
      this.tempPowersUsed = 1;
    } else if (cardSelections.isDoublePoints) {
      cardSelections.isDoublePoints = false;
      this.tempPowersUsed = 0;
    }
  }

  toggleDoubleTime(cardSelections) {
    if (this.availableSpecialPlays > 0 && !cardSelections.isDoubleTime) {
      cardSelections.isDoubleTime = true;
      this.tempPowersUsed = 1;
    } else if (cardSelections.isDoubleTime) {
      cardSelections.isDoubleTime = false;
      this.tempPowersUsed = 0;
    }
  }

  get wonCards() {
    if (this.liveMatch && this.liveMatch.playedCards)
      return this.liveMatch.playedCards.filter(x => x.status == 2 && x.pointsAwarded);
    return [];
  }

  get lostCards() {
    if (this.liveMatch && this.liveMatch.playedCards)
      return this.liveMatch.playedCards.filter(x => x.status == 2 && (x.pointsAwarded == 0 || !x.pointsAwarded));// && !x.pointsAwarded);
    return [];
  }

  get pendingCards() {
    if (this.liveMatch && this.liveMatch.playedCards)
      return this.liveMatch.playedCards.filter(x => x.status == 0 || x.status == 1);
    return [];
  }


  // PLAYCARDS
  get SelectedTime() {
    if (!this.sportimoService.currentMatch)
      return 0;

    if (this.selectedTime == this.minTimeValue && this.sportimoService.currentMatch.matchData.state > 0)
      return this.translate.instant("Now");
    else
      return this.selectedTime + "'";
  }


  getMinimumTime() {
    if (!this.sportimoService.currentMatch)
      return 0;
    this.minTimeValue = this.sportimoService.currentMatch.matchData.time; //this.sportimoService.currentMatch.matchData.time;   
    if (this.minTimeValue == null || this.minTimeValue == 0) this.minTimeValue = 1;
    if (this.fromTimeValue < this.minTimeValue) this.fromTimeValue = this.minTimeValue;
    if(this.sportimoService.currentMatch.matchData.state == 2)
    this.minTimeValue = this.fromTimeValue = 45;
    if(this.sportimoService.currentMatch.matchData.state == 4)
    this.minTimeValue = this.fromTimeValue = 90;
    return this.minTimeValue;
  }

  openPlayModal(card: any) {
    if (this.isLoadingCards)
      return;
    localStorage.setItem("hasClickedCard", "true");
    if (!this.liveMatch.matchData.completed) {
      this.selectedCard = card;
      this.selectedTime = this.getMinimumTime();
      this.playCardModal = true;
      this.hasClickedPlay = true;
    } else {
      this.errorService.showError("10001");
    }
  }

  closeModal() {
    if (this.isSubmitingCard) return;
    this.playCardModal = false;
    this.selectedCard = null;
    this.cancelAll();
  }

  valueChanged(e) {
    this.selectedTime = e.from;
  }

  getFormatedOption(optionText: string) {
    if (!this.sportimoService.currentMatch)
      return '';
    const home_team = this.sportimoService.currentMatch.matchData.home_team.name[this.translate.currentLang];
    const away_team = this.sportimoService.currentMatch.matchData.away_team.name[this.translate.currentLang];
    if (optionText)
      return optionText.replace("[[home_team_name]]", home_team).replace('[[away_team_name]]', away_team);
    else return optionText;
  }

  cancelAll() {
    this.cardSelections.isDoublePoints = false;
    this.cardSelections.isDoubleTime = false;
    this.cardSelections.optionId = null;
    this.isSubmitingCard = false;
  }

  optionSelect(option: string) {
    this.cardSelections.optionId = option;
    this.cardSelections.gamecardDefinitionId = this.selectedCard._id;
  }

  get optionSelected() {
    if (!this.selectedCard)
      return [];
    return this.selectedCard.options.find(x => x.optionId == this.cardSelections.optionId)
  }

  submitCard() {
    this.tempPowersUsed = 0;
    this.isSubmitingCard = true;
    this.cardSelections.minute = this.selectedTime;
    this.sportimoService.submitUserCard(this.cardSelections)
      .subscribe(playedCard => {
        this.isSubmitingCard = false;

        if (playedCard != null) {
          // Reload available to play cards
          this.playCard();
          this.closeModal();

        }
      }
        , error => {
          console.log('Error');
          this.isSubmitingCard = false;
        })
  }

  parseNumbers(text: string) {
    if (text)
      return this.Utils.parseNumbers(text, this.translate.currentLang == 'fa');
    else
      return "";
  }


}
