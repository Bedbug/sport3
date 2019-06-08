import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { PlayCard } from 'src/app/models/playcard';
import { ActivatedRoute } from '@angular/router';
import { LiveMatch } from 'src/app/models/live-match';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-match-page-cards',
  templateUrl: './match-page-cards.component.html',
  styleUrls: ['./match-page-cards.component.scss']
})
export class MatchPageCardsComponent implements OnInit {

  contestMatchId: string;
  contestId: string;
  // User is playing a card
  isPlayingCard: boolean = false;
  isLoadingCards: boolean = false;
  availableCards: PlayCard[] = [];
  liveMatch: LiveMatch;
  
  // @ViewChild('stickyMenu') menuElement: ElementRef;

  // sticky: boolean = false;
  // menuPosition: any;

  constructor(private route: ActivatedRoute, private sportimoService: SportimoService, private translate: TranslateService) {

   console.log(translate.currentLang)
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");
    })

    this.sportimoService.getCurrentLiveMatchData().subscribe(x=>this.liveMatch = x)
  }

  playCard() {
    this.isPlayingCard = true;
    this.isLoadingCards = true;
    this.sportimoService.getAvailableCards(this.contestId, this.contestMatchId).subscribe(availableCards => {
      this.availableCards = availableCards;
      this.isLoadingCards = false;
    })
  }

  get wonCards(){
    if(this.liveMatch && this.liveMatch.playedCards)
    return this.liveMatch.playedCards.filter(x=>x.status == 2 && x.pointsAwarded);
    return [];
  }

  get lostCards(){
    if(this.liveMatch && this.liveMatch.playedCards)
    return this.liveMatch.playedCards.filter(x=>x.status == 2 && !x.pointsAwarded);
    return [];
  }

  get pendingCards(){
    if(this.liveMatch && this.liveMatch.playedCards)
    return this.liveMatch.playedCards.filter(x=>x.status == 0 || x.status == 1);
    return [];
  }
  // ngAfterViewInit() {
  //   this.menuPosition = this.menuElement.nativeElement.offsetTop
  // }


  // @HostListener('window:scroll', ['$event'])
  // handleScroll(){

  //     const windowScroll = window.pageYOffset;

  //     console.log(windowScroll,this.menuPosition);

  //     if(windowScroll >= 105){
  //         this.sticky = true;
  //     } else {
  //         this.sticky = false;
  //     }
  // }

}
