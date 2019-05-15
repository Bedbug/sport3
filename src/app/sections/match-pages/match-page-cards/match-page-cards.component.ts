import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SportimoApiService } from 'src/app/services/sportimoapi.service';
import { PlayCard } from 'src/app/models/playcard';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
  
  // @ViewChild('stickyMenu') menuElement: ElementRef;

  // sticky: boolean = false;
  // menuPosition: any;

  constructor(private route: ActivatedRoute, private sportimoAPI: SportimoApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");
    })
  }

  playCard() {
    this.isPlayingCard = true;
    this.isLoadingCards = true;
    this.sportimoAPI.getAvailableCards(this.contestId, this.contestMatchId).subscribe(availableCards => {
      this.availableCards = availableCards;
      console.log(this.availableCards);
      this.isLoadingCards = false;
    })
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
