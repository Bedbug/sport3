import { Component, OnInit, Input } from '@angular/core';
import { ContestMatch } from 'src/app/models/contest-match';
import moment from 'moment-mini';
import { trigger, transition, stagger, animate, style, query } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SportimoService } from 'src/app/services/sportimo.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss'],
  animations:[
    trigger(
      'staggerAnimation', [
        transition('* => *', [
          query(':enter', style({opacity: 0}),{optional:true}),
          query(
            ':enter',
             stagger(
               '200ms', [
              animate('300ms', style({opacity: 1}))
          ]),{optional:true}),
          query(':leave', stagger('200ms', [
              animate('300ms', style({opacity: 0}))
          ]),{optional:true})
      ]),
      ]
    )
  ]
})
export class MatchesListComponent implements OnInit {

  @Input() present: ContestMatch[];
  @Input() past: ContestMatch[];
  
  contestId: string;
  isSubscribed: boolean;
  ngUnsubscribe = new Subject();

  constructor(public translate:TranslateService,private route: ActivatedRoute, private sportimoService: SportimoService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contestId = params.get("contestId");
      this.sportimoService.getContestDetails(this.contestId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.isSubscribed = result.isSubscribed;
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get liveMatches(){
    return this.present.filter(x => x.match.state > 0 && !x.match.completed);
  }

  get upcomingMatches(){
    const today = moment().utc().toDate();
    
    return this.present.filter(x=>{
      return moment(x.match.start).utc().toDate() > today;
    });
  }

  get pastMatches(){
    return this.past;
  }
}
