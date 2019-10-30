import { Component, OnInit } from '@angular/core';
import { SportimoService } from 'src/app/services/sportimo.service';
import { ActivatedRoute } from '@angular/router';
import { LiveMatch } from 'src/app/models/live-match';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { Contest } from 'src/app/models/contest';
import $ from 'jquery';
import { SportimoUtils } from 'src/app/helpers/sportimo-utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-match-page-leaders',
  templateUrl: './match-page-leaders.component.html',
  styleUrls: ['./match-page-leaders.component.scss']
})
export class MatchPageLeadersComponent implements OnInit {
  cellArray = [];
  contestMatchId: string;
  contestId: string;
  Utils: SportimoUtils = new SportimoUtils();


  constructor(private route: ActivatedRoute, private sportimoService: SportimoService, private authenticationService: AuthenticationService,public translate: TranslateService,) { }
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
    this.sportimoService.getContestMatchLeaders(this.contestId, this.contestMatchId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(leaders => {
      this.cellArray = leaders;

      // console.table(this.authenticationService.currentUser);
      // console.log("User Id: "+this.authenticationService.currentUser.source._value.id);
      // if(this.authenticationService.currentUser != null) {
      //   this.userRank = this.cellArray.findIndex(x=>x._id == this.authenticationService.currentUser.source._value.id);
      // }

      this.authenticationService.currentUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
        this.userRank = -1;
        if(user)
          this.userRank = this.cellArray.findIndex(x => x._id == user._id);         
          
          this.show = (user && this.userRank >= 0);
      })

    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  ngAfterViewInit() {
    this.checkScroll();
  }

  checkScroll() {
    let a = $(".leaders-scrollable-group");
    let b = $('.leaders-user');

    if(b.length == 0 || a.length ==0) return;
    
    if (b.position().top < a.position().top) {
      $(".leaders-table-user").addClass('leaders-table-user-up');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-up');
    }

    let dist = b.position().top - a.position().top - a.height() + 42;
    if (dist > 0) {
      $(".leaders-table-user").addClass('leaders-table-user-down');
    } else {
      $(".leaders-table-user").removeClass('leaders-table-user-down');
    }

  }

  parseNumbers(text:string){
    return this.Utils.parseNumbers(text,this.translate.currentLang == 'fa');
  }

}
