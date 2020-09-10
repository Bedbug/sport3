import { Component, OnInit } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contest } from 'src/app/models/contest';
import { PrizeViewOverlayService } from '../../main/prize-view-overlay/prize-view-overlay.service';
import { ContestInfoComponent } from '../contest-info/contest-info.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-contest-page-matches',
  templateUrl: './contest-page-matches.component.html',
  styleUrls: ['./contest-page-matches.component.scss']
})
export class ContestPageMatchesComponent implements OnInit {

  contestId: string;
  contestDetails: Contest;
  hasJoined = false;
  hasShownModal = false;
  ngUnsubscribe = new Subject();
  dataReload;

  presentMatches: ContestMatch[] = [
    // {id:"1",title:"Match 1", home_score:3, away_score: 1, live: true,  start: moment().toDate()},
    // {id:"2",title:"Match 2", home_score:0, away_score: 0, live: false, start: moment().add(1,'days').toDate()},
    // {id:"3",title:"Match 3", home_score:0, away_score: 0, live: false, start: moment().add(-1,'days').add(2 ,'hours').toDate()}
  ]

  pastMatches: ContestMatch[] = [
    // { id: "1", title: "Match 1", home_score: 3, away_score: 1, live: true, start: moment().toDate() },
    // { id: "2", title: "Match 2", home_score: 0, away_score: 0, live: false, start: moment().add(1, 'days').toDate() },
    // { id: "3", title: "Match 3", home_score: 0, away_score: 0, live: false, start: moment().add(-1, 'days').add(2, 'hours').toDate() }
  ]

  constructor(
    private route: ActivatedRoute,
    private sportimoService: SportimoService,
    private prizeViewOverlay: PrizeViewOverlayService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestId = params.get("contestId");
      this.sportimoService.getPresentMatches(this.contestId).subscribe(matches => {
        this.presentMatches = matches
                .sort(function(a, b) {                      
                return new Date(b.match.start).getTime() - new Date(a.match.start).getTime();
            });
      });
      var that = this;
      this.dataReload = setInterval(function(){that.reload();},20000);

      this.sportimoService.getPastMatches(this.contestId).subscribe(matches => this.pastMatches = matches  .sort(function(a, b) {               
      return new Date(b.match.start).getTime() - new Date(a.match.start).getTime();
  }));
    });

    this.sportimoService.cachedContests.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((allContests) => {
        if (allContests && allContests.length > 0 && this.contestId) {        
          this.contestDetails = allContests.find(x => x._id == this.contestId);
          if (this.contestDetails)
            this.hasJoined = this.contestDetails.isSubscribed || false;
          // console.log("IsUserDetails:",this.contestDetails.isUserDetails);

          // console.log("DEBUG: hasJoined always returns false");            
          // this.hasJoined = false;

          // Set a timeout in order to avoid async calls and duplicates
          // setTimeout(()=>{
          if (!this.hasJoined && !this.hasShownModal && (this.contestDetails.isUserDetails || !this.authenticationService.currentUserValue)) {
            this.hasShownModal = true;           
            this.prizeViewOverlay.open<ContestInfoComponent>(ContestInfoComponent, { data: this.contestDetails });
          }
          // },3000)

        }
      });
  }

  joinMatch(match){
    console.log(match);
    
  }

  reload() {
    this.sportimoService.getPresentMatches(this.contestId).subscribe(matches => {
      this.presentMatches = matches;
    });
  }

  ngOnDestroy() {
    clearInterval(this.dataReload);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
