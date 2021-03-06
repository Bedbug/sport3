import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import moment from 'moment-mini';
import { trigger, transition, stagger, animate, style, query } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import $ from 'jquery';


@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
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
export class MatchesListComponent implements OnInit {

  @Input() present: ContestMatch[];
  @Input() past: ContestMatch[];

  @Input() selectedTab: string;

  contestId: string;
  @Input() hasJoined: boolean;
  // isSubscribed: boolean;
  selected: string = "past";
  ngUnsubscribe = new Subject();

  constructor(public translate: TranslateService, private route: ActivatedRoute, private sportimoService: SportimoService,
    // private authenticationService:AuthenticationService
  ) {
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.contestId = params.get("contestId");
    //   this.sportimoService.getContestDetails(this.contestId)
    //     .pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe(result => {
    //       this.hasJoined = result.isSubscribed;
    //       console.log(result.isSubscribed);
    //     });

    //   this.sportimoService.cachedContests.pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe((allContests) => {
    //       if (allContests) {
    //         console.log("Check for update");

    //         this.sportimoService.getContestDetails(this.contestId)
    //           .pipe(takeUntil(this.ngUnsubscribe))
    //           .subscribe(result => {
    //             this.hasJoined = result.isSubscribed;
    //             console.log(result.isSubscribed);
    //           });
    //       }
    //     });
    // });

    // this.authenticationService.currentUser
    // .pipe(takeUntil(this.ngUnsubscribe))
    // .subscribe(user => {

    //   if (user != null) {
    //     // this.isSubscribed = (user && user.subscriptionEnd && moment(user.subscriptionEnd).utc() > moment().utc())
    //     this.isSubscribed = this.authenticationService.isSubscribed;
    //   }
    // })
   
    // Select tab by name
    this.selected = 'all';
    // console.log("Selectedtab: " + this.selectedTab);
    // console.log($('#myTab a[href="#live"]').trigger('show.bs.tab'));
    // console.log(document.getElementById('live-tab'));
    
    // $('#myTab a[href="#live"]').tab('show')
    // document.getElementById('live-tab').dispatchEvent(new MouseEvent('click'));
  }

  isFirst:any = true;
  changeTab() {
    // setTimeout(() => {
      // this.selected = 'live';
      // $('#myTab a[href="#live"]').trigger('show.bs.tab');
      console.log(this.selectedTab);
      
      if(this.selectedTab == 'live')
        document.getElementById('live-tab').click();

      if(this.selectedTab == 'upcoming')
        document.getElementById('upcoming-tab').click();
      // (<any>$('#myTab a[href="#live"]')).tab('show');
      // $('#myTab a[href="#profile"]').tab('show')
    // }, 2000);
    
    
  }
  

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get liveMatches() {
    // console.log(this.selectedTab);
    if(this.isFirst && this.present.length > 0){
      this.changeTab();
      this.isFirst = false;
    }
      
    // console.log(this.present.filter(x => x.match.state > 0 && !x.match.completed));
    return this.present.filter(x => x.match.state > 0 && !x.match.completed);
  }

  get upcomingMatches() {
    // const today = moment().utc().toDate();
    return this.present.filter(x => {
      return x.match.state == 0; //moment(x.match.start).utc().toDate() > today &&
    });
  }

  get pastMatches() {
    return this.past;
  }
}
