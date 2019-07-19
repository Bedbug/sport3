import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { LiveMatch } from 'src/app/models/live-match';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { Contest } from 'src/app/models/contest';
import $ from 'jquery';

@Component({
  selector: 'app-match-page-leaders',
  templateUrl: './match-page-leaders.component.html',
  styleUrls: ['./match-page-leaders.component.scss']
})
export class MatchPageLeadersComponent implements OnInit {
  cellArray = [
    { _id: "" },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: true },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
    { user: false },
  ];
  contestMatchId: string;
  contestId: string;
  

  constructor(private route: ActivatedRoute, private sportimoService: SportimoService, private authenticationService: AuthenticationService) { }
  userRank: Number;
  liveMatch: LiveMatch;
  ngUnsubscribe = new Subject();
  public show: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestMatchId = params.get("contestMatchId");
      this.contestId = params.get("contestId");
    })

     // Get Match Leaderboard
     this.sportimoService.getContestMatchLeaders(this.contestId, this.contestMatchId).subscribe(leaders => {
        console.table(leaders);
        this.cellArray = leaders;

        // console.table(this.authenticationService.currentUser);
        // console.log("User Id: "+this.authenticationService.currentUser.source._value.id);
        // if(this.authenticationService.currentUser != null) {
        //   this.userRank = this.cellArray.findIndex(x=>x._id == this.authenticationService.currentUser.source._value.id);
        // }
        
        this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user=>{
          console.log(user._id);
          this.userRank = this.cellArray.findIndex(x=>x._id == user._id);
          console.log("userRank "+this.userRank);
          if(this.userRank >= 0)
              this.show = true;
        })
          
      }
      
    );
    
    
    
  }

  ngAfterViewInit(){
    this.checkScroll();
  }

  checkScroll() {
    let a = $(".leaders-scrollable-group");
    let b = $('.leaders-user');

    if (b.position().top < a.position().top) {
      $(".leaders-table-user").addClass('leaders-table-user-up');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-up');
    }
    
    let dist = b.position().top - a.position().top - a.height() + 42;
    if (dist >0) {
      $(".leaders-table-user").addClass('leaders-table-user-down');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-down');
    }

  }

}
